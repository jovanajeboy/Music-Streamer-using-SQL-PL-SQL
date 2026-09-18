const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const oracledb = require("oracledb");
const { getConnection } = require("../db");

const router = express.Router();

// ==========================================
// REGISTER
// ==========================================
router.post("/register", async (req, res) => {
  let connection;

  try {
    const {
      first_name,
      last_name,
      email,
      password,
      middle_name,
      phone_no,
      gender,
      dob,
    } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({
        error:
          "First name, last name, email and password are required",
      });
    }

    connection = await getConnection();

    const cleanEmail = email.trim().toLowerCase();

    // Check if email already exists
    const existingUser = await connection.execute(
      `
      SELECT user_id
      FROM app_user
      WHERE LOWER(email) = :email
      `,
      {
        email: cleanEmail,
      }
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        error: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const result = await connection.execute(
      `
      INSERT INTO app_user (
        first_name,
        middle_name,
        last_name,
        email,
        phone_no,
        gender,
        dob,
        password
      )
      VALUES (
        :first_name,
        :middle_name,
        :last_name,
        :email,
        :phone_no,
        :gender,
        :dob,
        :password
      )
      RETURNING user_id INTO :user_id
      `,
      {
        first_name: first_name.trim(),
        middle_name: middle_name
          ? middle_name.trim()
          : null,
        last_name: last_name.trim(),
        email: cleanEmail,
        phone_no: phone_no || null,
        gender: gender || null,
        dob: dob ? new Date(dob) : null,
        password: hashedPassword,

        user_id: {
          dir: oracledb.BIND_OUT,
          type: oracledb.NUMBER,
        },
      },
      {
        autoCommit: true,
      }
    );

    const userId = result.outBinds.user_id[0];

    const token = jwt.sign(
      {
        user_id: userId,
        email: cleanEmail,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      message: "Registration successful",
      token,

      user: {
        user_id: userId,
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        email: cleanEmail,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      error: "Registration failed",
      details: error.message,
    });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});

// ==========================================
// LOGIN
// ==========================================
router.post("/login", async (req, res) => {
  let connection;

  try {
    const { email, password } = req.body;

    console.log("LOGIN REQUEST:", {
      email,
      passwordProvided: !!password,
    });

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    connection = await getConnection();

    const cleanEmail = email.trim().toLowerCase();

    const result = await connection.execute(
      `
      SELECT
        user_id,
        first_name,
        last_name,
        email,
        password
      FROM app_user
      WHERE LOWER(email) = :email
      `,
      {
        email: cleanEmail,
      }
    );

    console.log(
      "USER FOUND:",
      result.rows.length
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    console.log("USER ID:", user.USER_ID);
    console.log(
      "PASSWORD HASH EXISTS:",
      !!user.PASSWORD
    );

    if (!user.PASSWORD) {
      return res.status(401).json({
        error:
          "This account does not have a password. Please register again.",
      });
    }

    const passwordMatch = await bcrypt.compare(
      String(password),
      String(user.PASSWORD)
    );

    console.log(
      "PASSWORD MATCH:",
      passwordMatch
    );

    if (!passwordMatch) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        user_id: user.USER_ID,
        email: user.EMAIL,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,

      user: {
        user_id: user.USER_ID,
        first_name: user.FIRST_NAME,
        last_name: user.LAST_NAME,
        email: user.EMAIL,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      error: "Login failed",
      details: error.message,
    });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});

module.exports = router;