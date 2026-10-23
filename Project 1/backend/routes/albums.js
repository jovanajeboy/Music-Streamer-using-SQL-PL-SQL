const express = require("express");
const { getConnection } = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const result = await connection.execute(`
      SELECT
        album_id,
        artist_id,
        album_title,
        release_date,
        cover_page
      FROM album
      ORDER BY album_id
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch albums" });
  } finally {
    if (connection) await connection.close();
  }
});

router.get("/:id/songs", async (req, res) => {
  let connection;

  try {
    const albumId = Number(req.params.id);

    if (!Number.isInteger(albumId) || albumId <= 0) {
      return res.status(400).json({ error: "Invalid album ID" });
    }

    connection = await getConnection();

    const result = await connection.execute(
      `
        SELECT
          s.song_id,
          s.name,
          s.duration,
          s.audio_url,
          s.artist_id,
          s.album_id,
          a.name AS artist_name,
          al.album_title
        FROM song s
        LEFT JOIN artist a
          ON a.artist_id = s.artist_id
        LEFT JOIN album al
          ON al.album_id = s.album_id
        WHERE s.album_id = :albumId
        ORDER BY s.song_id
      `,
      { albumId }
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Get album songs error:", error);
    res.status(500).json({ error: "Failed to fetch album songs" });
  } finally {
    if (connection) await connection.close();
  }
});

router.put("/:id", async (req, res) => {
  let connection;

  try {
    const albumId = Number(req.params.id);
    const albumTitle = String(req.body.album_title || "").trim();

    if (!Number.isInteger(albumId) || albumId <= 0) {
      return res.status(400).json({ error: "Invalid album ID" });
    }

    if (!albumTitle) {
      return res.status(400).json({ error: "Album name cannot be empty" });
    }

    connection = await getConnection();

    const result = await connection.execute(
      `UPDATE album
       SET album_title = :albumTitle
       WHERE album_id = :albumId`,
      { albumTitle, albumId },
      { autoCommit: true }
    );

    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: "Album not found" });
    }

    return res.json({
      message: "Album name updated successfully",
      album_id: albumId,
      album_title: albumTitle
    });
  } catch (error) {
    console.error("Update album error:", error);
    return res.status(500).json({
      error: "Failed to update album name",
      details: error.message
    });
  } finally {
    if (connection) await connection.close();
  }
});

module.exports = router;