package com.musicstream;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.sql.*;
import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;
import javax.crypto.Mac;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

public class MusicStreamServer {

    private static final ObjectMapper JSON = new ObjectMapper();
    private static final SecureRandom RANDOM = new SecureRandom();

    private static final Set<String> TABLES = Set.of(
        "app_user", "artist", "podcast_creator", "playlist",
        "subscription", "device", "album", "song",
        "playlist_song", "user_artist", "podcast", "episode", "payment"
    );

    private static final Set<String> USER_OWNED_TABLES = Set.of(
        "playlist", "subscription", "payment", "device"
    );

    private static final Set<String> DATE_COLUMNS = Set.of(
        "dob", "created_date", "start_date", "end_date", "release_date",
        "added_date", "followed_date", "payment_date"
    );

    // Track skips per user for Free tier limit enforcement (in-memory per hour)
    private static final Map<Integer, List<Long>> USER_SKIPS = new ConcurrentHashMap<>();

    private static Connection connection() throws SQLException {
        String url = System.getenv("DB_URL");
        if (url == null || url.isBlank()) {
            url = "jdbc:postgresql://localhost:26257/musicstream?sslmode=disable&stringtype=unspecified";
        }
        String user = System.getenv("DB_USER");
        if (user == null || user.isBlank()) {
            user = "root";
        }
        String password = System.getenv("DB_PASSWORD");
        if (password == null) {
            password = "";
        }

        if (!url.contains("sslmode=")) {
            url += (url.contains("?") ? "&" : "?") + "sslmode=disable";
        }
        if (!url.contains("stringtype=")) {
            url += (url.contains("?") ? "&" : "?") + "stringtype=unspecified";
        }

        return DriverManager.getConnection(url, user, password);
    }

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(
            new InetSocketAddress(8080), 0
        );

        server.createContext("/api/", MusicStreamServer::handle);
        server.start();

        System.out.println(
            "MusicStream API running at http://localhost:8080"
        );
    }

    private static void handle(HttpExchange ex) throws IOException {
        cors(ex);

        try {
            String method = ex.getRequestMethod();

            if ("OPTIONS".equalsIgnoreCase(method)) {
                ex.sendResponseHeaders(204, -1);
                return;
            }

            String[] path = Arrays.stream(
                ex.getRequestURI().getPath().split("/")
            ).filter(s -> !s.isBlank()).toArray(String[]::new);

            if (path.length >= 2 && path[0].equals("api")) {
                if (path[1].equals("auth")) {
                    auth(ex, path);
                    return;
                }
                if (path[1].equals("subscription")) {
                    if (path.length >= 3 && path[2].equals("status")) {
                        subscriptionStatus(ex);
                        return;
                    }
                    if (path.length >= 3 && path[2].equals("cancel") && "POST".equalsIgnoreCase(method)) {
                        cancelSubscription(ex);
                        return;
                    }
                }
                if (path.length >= 3 && path[1].equals("billing") && path[2].equals("checkout")) {
                    checkout(ex);
                    return;
                }
                if (path[1].equals("stats")) {
                    stats(ex);
                    return;
                }
                if (path[1].equals("player") && path.length >= 3 && path[2].equals("skip") && "POST".equalsIgnoreCase(method)) {
                    recordSkip(ex);
                    return;
                }
            }

            if (path.length < 2 || !path[0].equals("api")) {
                send(ex, 400, Map.of(
                    "error", "Use /api/{table}/{key1}/{key2}..."
                ));
                return;
            }

            String table = path[1].toLowerCase(Locale.ROOT);

            if (table.equals("app_user")) {
                send(ex, 403, Map.of("error", "Use /api/auth endpoints for account access."));
                return;
            }

            if (!TABLES.contains(table)) {
                send(ex, 404, Map.of(
                    "error", "Unknown table",
                    "allowedTables", TABLES
                ));
                return;
            }

            // Optional authentication for public reads, required for user-scoped tables and mutations
            int authUserId = authenticatedUserOptional(ex);
            if (method.equals("POST") || method.equals("PUT") || method.equals("DELETE")) {
                if (authUserId <= 0) {
                    send(ex, 401, Map.of("error", "Sign in is required to modify data."));
                    return;
                }
            } else if (method.equals("GET")) {
                if ((USER_OWNED_TABLES.contains(table) || table.equals("user_artist")) && authUserId <= 0) {
                    send(ex, 401, Map.of("error", "Sign in is required to view personal library data."));
                    return;
                }
            }

            // Remaining URL segments are primary-key values, in PK order.
            List<String> keyValues = Arrays.asList(
                path.length > 2
                    ? Arrays.copyOfRange(path, 2, path.length)
                    : new String[0]
            );

            switch (method) {
                case "GET" -> getRows(ex, table, keyValues, authUserId);
                case "POST" -> {
                    if (!keyValues.isEmpty()) {
                        send(ex, 400, Map.of(
                            "error", "POST must use /api/" + table
                        ));
                    } else {
                        createRow(ex, table, authUserId);
                    }
                }
                case "PUT" -> {
                    if (keyValues.isEmpty()) {
                        send(ex, 400, Map.of(
                            "error", "PUT requires all primary-key values in the URL"
                        ));
                    } else {
                        updateRow(ex, table, keyValues, authUserId);
                    }
                }
                case "DELETE" -> {
                    if (keyValues.isEmpty()) {
                        send(ex, 400, Map.of(
                            "error", "DELETE requires all primary-key values in the URL"
                        ));
                    } else {
                        deleteRow(ex, table, keyValues, authUserId);
                    }
                }
                default -> send(ex, 405, Map.of(
                    "error", "Method not allowed"
                ));
            }

        } catch (IllegalArgumentException e) {
            send(ex, 400, Map.of("error", e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            send(ex, 500, Map.of(
                "error", "Request failed. Check the server console for details: " + e.getMessage()
            ));
        } finally {
            ex.close();
        }
    }

    private static boolean isUserPremium(Connection c, int userId) throws SQLException {
        String sql = """
            SELECT 1 FROM subscription
            WHERE user_id = ?
              AND start_date <= current_date
              AND (end_date IS NULL OR end_date >= current_date)
            LIMIT 1
            """;
        try (PreparedStatement ps = c.prepareStatement(sql)) {
            ps.setInt(1, userId);
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next();
            }
        }
    }

    private static int getPlaylistCount(Connection c, int userId) throws SQLException {
        String sql = "SELECT count(*) FROM playlist WHERE user_id = ?";
        try (PreparedStatement ps = c.prepareStatement(sql)) {
            ps.setInt(1, userId);
            try (ResultSet rs = ps.executeQuery()) {
                rs.next();
                return rs.getInt(1);
            }
        }
    }

    private static void auth(HttpExchange ex, String[] path) throws Exception {
        String action = path.length > 2 ? path[2] : "";

        if (action.equals("me") && ex.getRequestMethod().equals("GET")) {
            int id = authenticatedUser(ex);
            try (Connection c = connection();
                 PreparedStatement p = c.prepareStatement("SELECT user_id, first_name, email FROM app_user WHERE user_id = ?")) {
                p.setInt(1, id);
                ResultSet r = p.executeQuery();
                if (!r.next()) {
                    send(ex, 401, Map.of("error", "Account no longer exists."));
                    return;
                }
                send(ex, 200, Map.of(
                    "user_id", id,
                    "first_name", r.getString("first_name"),
                    "email", r.getString("email")
                ));
            }
            return;
        }

        if (action.equals("register") && ex.getRequestMethod().equals("POST")) {
            Map<String, Object> d = readJson(ex);
            String email = String.valueOf(d.get("email")).trim().toLowerCase(Locale.ROOT);
            String name = String.valueOf(d.get("first_name")).trim();
            String password = String.valueOf(d.get("password"));

            if (name.isBlank() || !email.contains("@") || password.length() < 8) {
                throw new IllegalArgumentException("Name, valid email, and an 8+ character password are required.");
            }

            try (Connection c = connection()) {
                // Check if email already exists
                try (PreparedStatement check = c.prepareStatement("SELECT user_id FROM app_user WHERE email = ?")) {
                    check.setString(1, email);
                    if (check.executeQuery().next()) {
                        send(ex, 409, Map.of("error", "Email already registered."));
                        return;
                    }
                }

                try (PreparedStatement p = c.prepareStatement(
                    "INSERT INTO app_user (first_name, email, password) VALUES (?, ?, ?) RETURNING user_id"
                )) {
                    p.setString(1, name);
                    p.setString(2, email);
                    p.setString(3, hash(password));
                    ResultSet r = p.executeQuery();
                    r.next();
                    int id = r.getInt(1);
                    send(ex, 201, Map.of(
                        "token", token(id),
                        "user", Map.of("user_id", id, "first_name", name, "email", email)
                    ));
                }
            }
            return;
        }

        if (action.equals("login") && ex.getRequestMethod().equals("POST")) {
            Map<String, Object> d = readJson(ex);
            String email = String.valueOf(d.get("email")).trim().toLowerCase(Locale.ROOT);
            String password = String.valueOf(d.get("password"));

            try (Connection c = connection();
                 PreparedStatement p = c.prepareStatement("SELECT user_id, first_name, email, password FROM app_user WHERE email = ?")) {
                p.setString(1, email);
                ResultSet r = p.executeQuery();
                if (!r.next() || !verify(password, r.getString("password"))) {
                    send(ex, 401, Map.of("error", "Invalid email or password"));
                    return;
                }
                int id = r.getInt("user_id");
                send(ex, 200, Map.of(
                    "token", token(id),
                    "user", Map.of("user_id", id, "first_name", r.getString("first_name"), "email", r.getString("email"))
                ));
            }
            return;
        }

        send(ex, 404, Map.of("error", "Unknown auth endpoint"));
    }

    private static void subscriptionStatus(HttpExchange ex) throws Exception {
        int id = authenticatedUser(ex);
        try (Connection c = connection()) {
            boolean premium = false;
            String expiry = "None";

            String sql = """
                SELECT end_date FROM subscription
                WHERE user_id = ?
                  AND start_date <= current_date
                  AND (end_date IS NULL OR end_date >= current_date)
                ORDER BY end_date DESC LIMIT 1
                """;
            try (PreparedStatement p = c.prepareStatement(sql)) {
                p.setInt(1, id);
                try (ResultSet r = p.executeQuery()) {
                    if (r.next()) {
                        premium = true;
                        expiry = r.getDate(1) != null ? r.getDate(1).toString() : "Unlimited";
                    }
                }
            }

            int pCount = getPlaylistCount(c, id);

            // Calculate remaining skips in current hour
            long oneHourAgo = System.currentTimeMillis() - 3600_000L;
            List<Long> skips = USER_SKIPS.computeIfAbsent(id, k -> Collections.synchronizedList(new ArrayList<>()));
            synchronized (skips) {
                skips.removeIf(ts -> ts < oneHourAgo);
            }
            int remainingSkips = premium ? -1 : Math.max(0, 6 - skips.size());

            Map<String, Object> limits = new LinkedHashMap<>();
            limits.put("playlists", premium ? -1 : 3);
            limits.put("skipsPerHour", premium ? -1 : 6);
            limits.put("remainingSkips", remainingSkips);

            Map<String, Object> resp = new LinkedHashMap<>();
            resp.put("plan", premium ? "Premium" : "Free");
            resp.put("expiry", expiry);
            resp.put("playlistCount", pCount);
            resp.put("limits", limits);

            send(ex, 200, resp);
        }
    }

    private static void cancelSubscription(HttpExchange ex) throws Exception {
        int id = authenticatedUser(ex);
        try (Connection c = connection()) {
            String sql = """
                UPDATE subscription
                SET end_date = current_date
                WHERE user_id = ?
                  AND start_date <= current_date
                  AND (end_date IS NULL OR end_date >= current_date)
                """;
            try (PreparedStatement ps = c.prepareStatement(sql)) {
                ps.setInt(1, id);
                int count = ps.executeUpdate();
                send(ex, 200, Map.of(
                    "message", count > 0 ? "Subscription cancelled." : "No active subscription found to cancel.",
                    "plan", "Free",
                    "rowsAffected", count
                ));
            }
        }
    }

    private static void recordSkip(HttpExchange ex) throws Exception {
        int id = authenticatedUser(ex);
        try (Connection c = connection()) {
            boolean premium = isUserPremium(c, id);
            if (premium) {
                send(ex, 200, Map.of("allowed", true, "remaining", -1, "plan", "Premium"));
                return;
            }

            long oneHourAgo = System.currentTimeMillis() - 3600_000L;
            List<Long> skips = USER_SKIPS.computeIfAbsent(id, k -> Collections.synchronizedList(new ArrayList<>()));
            synchronized (skips) {
                skips.removeIf(ts -> ts < oneHourAgo);
                if (skips.size() >= 6) {
                    send(ex, 429, Map.of(
                        "allowed", false,
                        "error", "Hourly skip limit reached (6 skips/hour on Free plan). Upgrade to Premium for unlimited skips.",
                        "remaining", 0
                    ));
                    return;
                }
                skips.add(System.currentTimeMillis());
                int rem = 6 - skips.size();
                send(ex, 200, Map.of("allowed", true, "remaining", rem, "plan", "Free"));
            }
        }
    }

    private static void checkout(HttpExchange ex) throws Exception {
        if (!ex.getRequestMethod().equals("POST")) {
            send(ex, 405, Map.of("error", "POST required"));
            return;
        }

        int id = authenticatedUser(ex);
        Map<String, Object> d = readJson(ex);
        String plan = String.valueOf(d.get("plan")).toLowerCase(Locale.ROOT);

        if (!plan.equals("monthly") && !plan.equals("annual")) {
            throw new IllegalArgumentException("Choose monthly or annual.");
        }

        // Server decides price strictly from plan name
        java.math.BigDecimal amount = plan.equals("annual")
            ? new java.math.BigDecimal("799.00")
            : new java.math.BigDecimal("99.00");

        try (Connection c = connection()) {
            c.setAutoCommit(false);
            try {
                LocalDate end = LocalDate.now().plusMonths(plan.equals("annual") ? 12 : 1);
                int subId;

                try (PreparedStatement p = c.prepareStatement(
                    "INSERT INTO subscription (user_id, plan_type, start_date, end_date) VALUES (?, ?, current_date, ?) RETURNING subscription_id"
                )) {
                    p.setInt(1, id);
                    p.setString(2, plan.toUpperCase(Locale.ROOT));
                    p.setDate(3, java.sql.Date.valueOf(end));
                    ResultSet r = p.executeQuery();
                    r.next();
                    subId = r.getInt(1);
                }

                String paymentMode = String.valueOf(d.getOrDefault("payment_mode", "UPI"));

                try (PreparedStatement p = c.prepareStatement(
                    "INSERT INTO payment (user_id, subscription_id, amount, payment_mode, payment_date) VALUES (?, ?, ?, ?, current_date)"
                )) {
                    p.setInt(1, id);
                    p.setInt(2, subId);
                    p.setBigDecimal(3, amount);
                    p.setString(4, paymentMode);
                    p.executeUpdate();
                }

                c.commit();

                send(ex, 201, Map.of(
                    "message", "Payment processed successfully (demo)",
                    "plan", "Premium",
                    "expiry", end.toString(),
                    "amount", amount,
                    "payment_mode", paymentMode
                ));
            } catch (Exception e) {
                c.rollback();
                throw e;
            }
        }
    }

    private static void stats(HttpExchange ex) throws Exception {
        try (Connection c = connection(); Statement s = c.createStatement()) {
            Map<String, Integer> r = new LinkedHashMap<>();
            for (String t : List.of("song", "artist", "album", "podcast", "playlist", "app_user")) {
                try (ResultSet cr = s.executeQuery("SELECT count(*) FROM " + q(t))) {
                    cr.next();
                    r.put(t, cr.getInt(1));
                }
            }
            send(ex, 200, r);
        }
    }

    private static String hash(String password) throws Exception {
        byte[] salt = new byte[16];
        RANDOM.nextBytes(salt);
        byte[] h = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256")
            .generateSecret(new PBEKeySpec(password.toCharArray(), salt, 120000, 256))
            .getEncoded();
        return "pbkdf2$120000$" + Base64.getEncoder().encodeToString(salt) + "$" + Base64.getEncoder().encodeToString(h);
    }

    private static boolean verify(String password, String stored) throws Exception {
        if (stored == null || !stored.startsWith("pbkdf2$")) return false;
        String[] p = stored.split("\\$");
        byte[] h = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256")
            .generateSecret(new PBEKeySpec(password.toCharArray(), Base64.getDecoder().decode(p[2]), Integer.parseInt(p[1]), 256))
            .getEncoded();
        return MessageDigest.isEqual(h, Base64.getDecoder().decode(p[3]));
    }

    private static String getAuthSecret() {
        String secret = System.getenv("AUTH_SECRET");
        if (secret != null && secret.length() >= 32) {
            return secret;
        }
        return "sonicly-default-secure-hmac-jwt-secret-key-32chars";
    }

    private static String token(int id) throws Exception {
        String secret = getAuthSecret();
        String head = Base64.getUrlEncoder().withoutPadding().encodeToString("{\"alg\":\"HS256\",\"typ\":\"JWT\"}".getBytes(StandardCharsets.UTF_8));
        String body = Base64.getUrlEncoder().withoutPadding().encodeToString(
            ("{\"user_id\":" + id + ",\"exp\":" + (System.currentTimeMillis() / 1000 + 604800) + "}").getBytes(StandardCharsets.UTF_8)
        );
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
        return head + "." + body + "." + Base64.getUrlEncoder().withoutPadding().encodeToString(mac.doFinal((head + "." + body).getBytes(StandardCharsets.UTF_8)));
    }

    private static int authenticatedUser(HttpExchange ex) throws Exception {
        int id = authenticatedUserOptional(ex);
        if (id <= 0) {
            throw new IllegalArgumentException("Sign in is required.");
        }
        return id;
    }

    private static int authenticatedUserOptional(HttpExchange ex) {
        String h = ex.getRequestHeaders().getFirst("Authorization");
        if (h == null || !h.startsWith("Bearer ")) {
            return -1;
        }
        try {
            String[] p = h.substring(7).split("\\.");
            if (p.length != 3) return -1;
            String secret = getAuthSecret();
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            String sig = Base64.getUrlEncoder().withoutPadding().encodeToString(mac.doFinal((p[0] + "." + p[1]).getBytes(StandardCharsets.UTF_8)));
            if (!MessageDigest.isEqual(sig.getBytes(StandardCharsets.UTF_8), p[2].getBytes(StandardCharsets.UTF_8))) {
                return -1;
            }
            String body = new String(Base64.getUrlDecoder().decode(p[1]), StandardCharsets.UTF_8);
            java.util.regex.Matcher m = java.util.regex.Pattern.compile("\"user_id\":(\\d+).*?\"exp\":(\\d+)").matcher(body);
            if (!m.find() || Long.parseLong(m.group(2)) < System.currentTimeMillis() / 1000) {
                return -1;
            }
            return Integer.parseInt(m.group(1));
        } catch (Exception e) {
            return -1;
        }
    }

    // GET /api/table
    // GET /api/table/key1/key2/...
    private static void getRows(
        HttpExchange ex, String table, List<String> keyValues, int authUserId
    ) throws Exception {

        try (Connection c = connection()) {
            List<String> pk = primaryKeys(c, table);

            if (keyValues.isEmpty()) {
                String sql;
                PreparedStatement ps;

                // Ownership enforcement: only show user's own data for user-scoped tables
                if (USER_OWNED_TABLES.contains(table) || table.equals("user_artist")) {
                    sql = "SELECT * FROM public." + q(table) + " WHERE user_id = ? LIMIT 500";
                    ps = c.prepareStatement(sql);
                    ps.setInt(1, authUserId);
                } else {
                    sql = "SELECT * FROM public." + q(table) + " LIMIT 500";
                    ps = c.prepareStatement(sql);
                }

                try (ps; ResultSet rs = ps.executeQuery()) {
                    send(ex, 200, resultRows(rs));
                }
                return;
            }

            validateKeyCount(pk, keyValues);

            String where = buildWhere(pk);
            String sql = "SELECT * FROM public." + q(table) + " WHERE " + where;

            try (PreparedStatement ps = c.prepareStatement(sql)) {
                bindKeys(ps, 1, keyValues);

                try (ResultSet rs = ps.executeQuery()) {
                    List<Map<String, Object>> rows = resultRows(rs);

                    if (rows.isEmpty()) {
                        send(ex, 404, Map.of("error", "Record not found"));
                        return;
                    }

                    Map<String, Object> record = rows.get(0);
                    // Ownership verification
                    if (USER_OWNED_TABLES.contains(table) || table.equals("user_artist")) {
                        Object ownerId = record.get("user_id");
                        if (ownerId != null && !String.valueOf(ownerId).equals(String.valueOf(authUserId))) {
                            send(ex, 403, Map.of("error", "Access denied: you do not own this record."));
                            return;
                        }
                    }

                    send(ex, 200, record);
                }
            }
        }
    }

    // POST /api/table
    private static void createRow(HttpExchange ex, String table, int authUserId)
        throws Exception {

        Map<String, Object> data = readJson(ex);
        normalizeAliases(table, data);

        if (data.isEmpty()) {
            send(ex, 400, Map.of(
                "error", "JSON body must contain fields"
            ));
            return;
        }

        try (Connection c = connection()) {
            // Ownership & limits:
            if (USER_OWNED_TABLES.contains(table) || table.equals("user_artist")) {
                data.put("user_id", authUserId);
            }

            // Enforce max 3 playlists for Free tier
            if (table.equals("playlist")) {
                boolean premium = isUserPremium(c, authUserId);
                if (!premium) {
                    int count = getPlaylistCount(c, authUserId);
                    if (count >= 3) {
                        send(ex, 403, Map.of(
                            "error", "Free plan limit reached (max 3 playlists). Upgrade to Premium for unlimited playlists."
                        ));
                        return;
                    }
                }
            }

            // Enforce ownership of playlist when adding a song to a playlist
            if (table.equals("playlist_song")) {
                Object pIdObj = data.get("playlist_id");
                if (pIdObj != null) {
                    int pId = Integer.parseInt(String.valueOf(pIdObj));
                    try (PreparedStatement check = c.prepareStatement("SELECT user_id FROM playlist WHERE playlist_id = ?")) {
                        check.setInt(1, pId);
                        ResultSet rs = check.executeQuery();
                        if (!rs.next() || rs.getInt(1) != authUserId) {
                            send(ex, 403, Map.of("error", "Access denied: you do not own this playlist."));
                            return;
                        }
                    }
                }
            }

            validate(data, columns(c, table));

            List<String> names = new ArrayList<>(data.keySet());

            String sql = "INSERT INTO public." + q(table)
                + " (" + names.stream()
                    .map(MusicStreamServer::q)
                    .collect(Collectors.joining(","))
                + ") VALUES ("
                + String.join(",", Collections.nCopies(names.size(), "?"))
                + ")";

            try (PreparedStatement ps = c.prepareStatement(sql)) {
                for (int i = 0; i < names.size(); i++) {
                    bindValue(ps, i + 1, names.get(i), data.get(names.get(i)));
                }

                ps.executeUpdate();
            }

            send(ex, 201, Map.of("message", "Record created"));
        }
    }

    // PUT /api/table/key1/key2/...
    private static void updateRow(
        HttpExchange ex, String table, List<String> keyValues, int authUserId
    ) throws Exception {

        Map<String, Object> data = readJson(ex);
        normalizeAliases(table, data);

        if (data.isEmpty()) {
            send(ex, 400, Map.of(
                "error", "JSON body must contain fields to update"
            ));
            return;
        }

        try (Connection c = connection()) {
            List<String> pk = primaryKeys(c, table);
            validateKeyCount(pk, keyValues);
            validate(data, columns(c, table));

            // Verify ownership if user-scoped table
            if (USER_OWNED_TABLES.contains(table)) {
                String checkSql = "SELECT user_id FROM public." + q(table) + " WHERE " + buildWhere(pk);
                try (PreparedStatement ps = c.prepareStatement(checkSql)) {
                    bindKeys(ps, 1, keyValues);
                    try (ResultSet rs = ps.executeQuery()) {
                        if (!rs.next()) {
                            send(ex, 404, Map.of("error", "Record not found"));
                            return;
                        }
                        if (rs.getInt(1) != authUserId) {
                            send(ex, 403, Map.of("error", "Access denied: you do not own this record."));
                            return;
                        }
                    }
                }
                data.remove("user_id"); // Prevent modifying ownership
            }

            for (String key : pk) {
                if (data.containsKey(key)) {
                    send(ex, 400, Map.of(
                        "error", "Do not include primary-key column '" +
                            key + "' in the update body"
                    ));
                    return;
                }
            }

            List<String> names = new ArrayList<>(data.keySet());

            String setClause = names.stream()
                .map(name -> q(name) + " = ?")
                .collect(Collectors.joining(", "));

            String sql = "UPDATE public." + q(table)
                + " SET " + setClause
                + " WHERE " + buildWhere(pk);

            try (PreparedStatement ps = c.prepareStatement(sql)) {
                int index = 1;

                for (String name : names) {
                    bindValue(ps, index++, name, data.get(name));
                }

                bindKeys(ps, index, keyValues);

                int count = ps.executeUpdate();

                if (count == 0) {
                    send(ex, 404, Map.of("error", "Record not found"));
                } else {
                    send(ex, 200, Map.of(
                        "message", "Record updated",
                        "rowsAffected", count
                    ));
                }
            }
        }
    }

    // DELETE /api/table/key1/key2/...
    private static void deleteRow(
        HttpExchange ex, String table, List<String> keyValues, int authUserId
    ) throws Exception {

        try (Connection c = connection()) {
            List<String> pk = primaryKeys(c, table);
            validateKeyCount(pk, keyValues);

            // Ownership check for user-owned tables
            if (USER_OWNED_TABLES.contains(table)) {
                String checkSql = "SELECT user_id FROM public." + q(table) + " WHERE " + buildWhere(pk);
                try (PreparedStatement ps = c.prepareStatement(checkSql)) {
                    bindKeys(ps, 1, keyValues);
                    try (ResultSet rs = ps.executeQuery()) {
                        if (!rs.next()) {
                            send(ex, 404, Map.of("error", "Record not found"));
                            return;
                        }
                        if (rs.getInt(1) != authUserId) {
                            send(ex, 403, Map.of("error", "Access denied: you do not own this record."));
                            return;
                        }
                    }
                }
            }

            // Ownership check for user_artist (pk is [user_id, artist_id])
            if (table.equals("user_artist")) {
                if (keyValues.size() >= 1 && !keyValues.get(0).equals(String.valueOf(authUserId))) {
                    send(ex, 403, Map.of("error", "Access denied: you can only unfollow artists for your own account."));
                    return;
                }
            }

            // Ownership check for playlist_song: ensure user owns the playlist
            if (table.equals("playlist_song")) {
                int pId = Integer.parseInt(keyValues.get(0));
                try (PreparedStatement ps = c.prepareStatement("SELECT user_id FROM playlist WHERE playlist_id = ?")) {
                    ps.setInt(1, pId);
                    try (ResultSet rs = ps.executeQuery()) {
                        if (!rs.next() || rs.getInt(1) != authUserId) {
                            send(ex, 403, Map.of("error", "Access denied: you do not own this playlist."));
                            return;
                        }
                    }
                }
            }

            String sql = "DELETE FROM public." + q(table)
                + " WHERE " + buildWhere(pk);

            try (PreparedStatement ps = c.prepareStatement(sql)) {
                bindKeys(ps, 1, keyValues);

                int count = ps.executeUpdate();

                if (count == 0) {
                    send(ex, 404, Map.of("error", "Record not found"));
                } else {
                    send(ex, 200, Map.of(
                        "message", "Record deleted",
                        "rowsAffected", count
                    ));
                }
            }
        }
    }

    private static String buildWhere(List<String> pk) {
        if (pk.isEmpty()) {
            throw new IllegalArgumentException(
                "This table has no primary key; record-specific operations are unavailable."
            );
        }

        return pk.stream()
            .map(column -> q(column) + " = ?")
            .collect(Collectors.joining(" AND "));
    }

    private static void bindKeys(
        PreparedStatement ps, int startIndex, List<String> keyValues
    ) throws SQLException {

        for (int i = 0; i < keyValues.size(); i++) {
            ps.setObject(startIndex + i, scalar(keyValues.get(i)));
        }
    }

    private static void validateKeyCount(
        List<String> pk, List<String> keyValues
    ) {
        if (pk.isEmpty()) {
            throw new IllegalArgumentException(
                "This table has no primary key."
            );
        }

        if (pk.size() != keyValues.size()) {
            throw new IllegalArgumentException(
                "This table requires " + pk.size()
                    + " primary-key value(s), in this order: " + pk
            );
        }
    }

    private static Map<String, Object> readJson(HttpExchange ex)
        throws IOException {

        Map<String, Object> map = JSON.readValue(
            ex.getRequestBody(),
            new TypeReference<Map<String, Object>>() {}
        );
        return map != null ? new HashMap<>(map) : new HashMap<>();
    }

    private static Set<String> columns(Connection c, String table)
        throws SQLException {

        Set<String> result = new HashSet<>();

        String sql = """
            SELECT column_name
            FROM information_schema.columns
            WHERE table_schema = 'public' AND table_name = ?
            """;

        try (PreparedStatement ps = c.prepareStatement(sql)) {
            ps.setString(1, table);

            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    result.add(rs.getString("column_name"));
                }
            }
        }

        return result;
    }

    private static List<String> primaryKeys(Connection c, String table)
        throws SQLException {

        List<String> result = new ArrayList<>();

        String sql = """
            SELECT kcu.column_name
            FROM information_schema.table_constraints tc
            JOIN information_schema.key_column_usage kcu
              ON tc.constraint_catalog = kcu.constraint_catalog
             AND tc.constraint_schema = kcu.constraint_schema
             AND tc.constraint_name = kcu.constraint_name
             AND tc.table_schema = kcu.table_schema
             AND tc.table_name = kcu.table_name
            WHERE tc.table_schema = 'public'
              AND tc.table_name = ?
              AND tc.constraint_type = 'PRIMARY KEY'
            ORDER BY kcu.ordinal_position
            """;

        try (PreparedStatement ps = c.prepareStatement(sql)) {
            ps.setString(1, table);

            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    result.add(rs.getString("column_name"));
                }
            }
        }

        return result;
    }

    private static List<Map<String, Object>> resultRows(ResultSet rs)
        throws SQLException {

        List<Map<String, Object>> rows = new ArrayList<>();
        ResultSetMetaData md = rs.getMetaData();

        while (rs.next()) {
            Map<String, Object> row = new LinkedHashMap<>();

            for (int i = 1; i <= md.getColumnCount(); i++) {
                String label = md.getColumnLabel(i);
                // Security: NEVER return password column anywhere
                if ("password".equalsIgnoreCase(label)) continue;
                row.put(label, rs.getObject(i));
            }

            rows.add(row);
        }

        return rows;
    }

    private static void normalizeAliases(String table, Map<String, Object> data) {
        if (data == null || data.isEmpty()) return;
        String t = table.toLowerCase();
        if ("song".equals(t)) {
            if (data.containsKey("title") && !data.containsKey("name")) {
                data.put("name", data.remove("title"));
            }
            if (data.containsKey("song_name") && !data.containsKey("name")) {
                data.put("name", data.remove("song_name"));
            }
            if (data.containsKey("track_name") && !data.containsKey("name")) {
                data.put("name", data.remove("track_name"));
            }
            if (data.containsKey("song_title") && !data.containsKey("name")) {
                data.put("name", data.remove("song_title"));
            }
        } else if ("album".equals(t)) {
            if (data.containsKey("title") && !data.containsKey("album_title")) {
                data.put("album_title", data.remove("title"));
            }
            if (data.containsKey("name") && !data.containsKey("album_title")) {
                data.put("album_title", data.remove("name"));
            }
            if (data.containsKey("album_name") && !data.containsKey("album_title")) {
                data.put("album_title", data.remove("album_name"));
            }
        } else if ("playlist".equals(t)) {
            if (data.containsKey("name") && !data.containsKey("playlist_name")) {
                data.put("playlist_name", data.remove("name"));
            }
            if (data.containsKey("title") && !data.containsKey("playlist_name")) {
                data.put("playlist_name", data.remove("title"));
            }
            if (data.containsKey("playlist_title") && !data.containsKey("playlist_name")) {
                data.put("playlist_name", data.remove("playlist_title"));
            }
        } else if ("artist".equals(t)) {
            if (data.containsKey("artist_name") && !data.containsKey("name")) {
                data.put("name", data.remove("artist_name"));
            }
        } else if ("podcast".equals(t)) {
            if (data.containsKey("name") && !data.containsKey("title")) {
                data.put("title", data.remove("name"));
            }
            if (data.containsKey("podcast_name") && !data.containsKey("title")) {
                data.put("title", data.remove("podcast_name"));
            }
            if (data.containsKey("podcast_title") && !data.containsKey("title")) {
                data.put("title", data.remove("podcast_title"));
            }
        } else if ("episode".equals(t)) {
            if (data.containsKey("name") && !data.containsKey("title")) {
                data.put("title", data.remove("name"));
            }
            if (data.containsKey("episode_name") && !data.containsKey("title")) {
                data.put("title", data.remove("episode_name"));
            }
            if (data.containsKey("episode_title") && !data.containsKey("title")) {
                data.put("title", data.remove("episode_title"));
            }
        }
    }

    private static void validate(
        Map<String, Object> data, Set<String> allowedColumns
    ) {
        for (String key : data.keySet()) {
            if (!allowedColumns.contains(key)) {
                throw new IllegalArgumentException(
                    "Unknown column: '" + key + "'. Valid columns for this table are: " + allowedColumns
                );
            }
        }
    }

    private static Object scalar(String value) {
        try {
            return Long.parseLong(value);
        } catch (NumberFormatException e) {
            return value;
        }
    }

    private static void bindValue(
        PreparedStatement ps, int index, String column, Object value
    ) throws SQLException {
        if (value == null) {
            ps.setObject(index, null);
        } else if (DATE_COLUMNS.contains(column) && value instanceof String date) {
            ps.setDate(index, java.sql.Date.valueOf(LocalDate.parse(date)));
        } else {
            ps.setObject(index, value);
        }
    }

    private static String q(String identifier) {
        return "\"" + identifier.replace("\"", "\"\"") + "\"";
    }

    private static void cors(HttpExchange ex) {
        ex.getResponseHeaders().set(
            "Access-Control-Allow-Origin", "*"
        );
        ex.getResponseHeaders().set(
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, DELETE, OPTIONS"
        );
        ex.getResponseHeaders().set(
            "Access-Control-Allow-Headers", "Content-Type, Authorization"
        );
    }

    private static void send(
        HttpExchange ex, int status, Object body
    ) throws IOException {

        byte[] bytes = JSON.writeValueAsBytes(body);

        ex.getResponseHeaders().set(
            "Content-Type", "application/json; charset=UTF-8"
        );

        ex.sendResponseHeaders(status, bytes.length);

        try (var out = ex.getResponseBody()) {
            out.write(bytes);
        }
    }
}
