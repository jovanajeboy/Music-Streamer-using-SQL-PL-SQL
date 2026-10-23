const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Access token required",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not configured");

    return res.status(500).json({
      error: "Server authentication configuration error",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (!decoded.user_id) {
      return res.status(401).json({
        error: "Token does not contain a user ID",
      });
    }

    req.user = {
      user_id: decoded.user_id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
}

module.exports = authenticateToken;
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Access token required",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not configured");

    return res.status(500).json({
      error: "Server authentication configuration error",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (!decoded.user_id) {
      return res.status(401).json({
        error: "Token does not contain a user ID",
      });
    }

    req.user = {
      user_id: decoded.user_id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
}

module.exports = authenticateToken;