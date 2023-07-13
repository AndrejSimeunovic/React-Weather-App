import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import url from "url";
import rateLimit from "express-rate-limit";

const PORT = 5000;

dotenv.config();

const app = express();

//enable cors
app.use(cors());

const limiter = rateLimit({
  windowMs: 86400000, // 1 day
  max: 1000,
});

app.use(limiter);
app.set("trust proxy", 1);

const APIKEY = process.env.VITE_API_KEY;
const BASEURL = process.env.VITE_BASE_URL;

app.get("/api", async (req, res) => {
  try {
    const response = await axios.get(`${BASEURL}`, {
      params: {
        q: req.query.q,
        APPID: APIKEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
