require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

function normalizeOrigin(value) {
  return String(value || "").trim().replace(/\/+$/, "");
}

function getAllowedOrigins() {
  const configuredOrigins =
    process.env.CLIENT_ORIGIN || "http://localhost:5173,https://devdna-r9c6.onrender.com";

  return configuredOrigins
    .split(",")
    .map((origin) => normalizeOrigin(origin))
    .filter(Boolean);
}

const allowedOrigins = getAllowedOrigins();

connectDB();

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      const normalizedRequestOrigin = normalizeOrigin(origin);

      if (allowedOrigins.includes(normalizedRequestOrigin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
  }),
);
app.use(express.json());

app.get("/", (request, response) => {
  response.json({
    message: "DevDNA backend is running",
  });
});

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
