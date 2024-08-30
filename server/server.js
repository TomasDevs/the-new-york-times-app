const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Dynamically import node-fetch for use in CommonJS environment
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS to allow requests from different origins
app.use(cors());

// Define a route to fetch top stories from the New York Times API

app.get("/api/articles", async (req, res) => {
  try {
    // Fetch data from the NYT Top Stories API using the API key from .env
    const response = await fetch(
      `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.NYT_API_KEY}`
    );
    const data = await response.json();

    // Send the fetched data as JSON response
    res.json(data);
  } catch (error) {
    // Handle errors by sending a 500 status code and an error message
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  //   console.log(`Server running on port ${PORT}`);
});
