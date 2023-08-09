const express = require("express");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");
const rateLimit = require("express-rate-limit");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
  max: 1000,
  message: "You have exceeded the 1000 requests in 24 hrs limit!",
});

app.use(limiter);
app.set("trust proxy", 1);

const APIKEY = process.env.VITE_API_KEY;
const BASEURL = process.env.VITE_BASE_URL;
const BASEURL2 = process.env.VITE_BASE_URL_2;

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/api/openweathermap", async (req, res) => {
  try {
    const response = await axios.get(`${BASEURL}`, {
      params: {
        q: req.query.q,
        units: "metric",
        APPID: APIKEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});
app.get("/api/open-meteo", async (req, res) => {
  try {
    const response = await axios.get(`${BASEURL2}`, {
      params: {
        latitude: req.query.latitude,
        longitude: req.query.longitude,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
