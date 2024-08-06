require("dotenv").config();
const { Pool } = require("pg");
const express = require("express");
const app = express();
const port = 3000;

const pool = new Pool({
  user: process.env.POSTGRES_USER || "user",
  host: process.env.POSTGRES_HOST || "localhost",
  database: process.env.POSTGRES_DATABASE || "LeaderBoard",
  password: process.env.POSTGRES_PASSWORD || "pass",
  port: process.env.POSTGRES_PORT || 5432,
});

app.use(express.json());
const apiUrl = "/api/leaderboard";

// Serve a simple HTML page to indicate the server is running
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Server Status</title>
      </head>
      <body>
        <h1>The server is running</h1>
        <p>API is available at <a href="/api/leaderboard">/api/leaderboard</a></p>
      </body>
    </html>
  `);
});

// Test database connection
app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      success: true,
      message: "Database connection successful",
      timestamp: result.rows[0].now,
    });
  } catch (err) {
    console.error("Error testing database connection", err.stack);
    res.status(500).json({
      success: false,
      message: "Error testing database connection",
      error: err.stack,
    });
  }
});

// Get all leaderboard entries
app.get(apiUrl, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM leaderBoard");
    res.json(result.rows);
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).send("Error executing query");
  }
});

// Get a single leaderboard entry by ID
app.get(`${apiUrl}/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM leaderBoard WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).send("Entry not found");
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).send("Error executing query");
  }
});

// Create a new leaderboard entry
app.post(apiUrl, async (req, res) => {
  const { username, score } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO leaderBoard (username, score) VALUES ($1, $2) RETURNING *",
      [username, score]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting data", err.stack);
    res.status(500).send("Error inserting data");
  }
});

// Update a leaderboard entry by ID
app.put(`${apiUrl}/:id`, async (req, res) => {
  const { id } = req.params;
  const { username, score } = req.body;
  try {
    const result = await pool.query(
      "UPDATE leaderBoard SET username = $1, score = $2 WHERE id = $3 RETURNING *",
      [username, score, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Entry not found");
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating data", err.stack);
    res.status(500).send("Error updating data");
  }
});

// Delete a leaderboard entry by ID
app.delete(`${apiUrl}/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM leaderBoard WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).send("Entry not found");
    }
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting data", err.stack);
    res.status(500).send("Error deleting data");
  }
});

// Delete all leaderboard entries
app.delete(apiUrl, async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM leaderBoard RETURNING *");
    if (result.rows.length === 0) {
      return res.status(404).send("No entries found to delete");
    }
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting all data", err.stack);
    res.status(500).send("Error deleting all data");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
