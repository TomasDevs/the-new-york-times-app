const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// Dynamický import node-fetch pro CommonJS prostředí
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/articles", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.NYT_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
