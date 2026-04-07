require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

connectDB();

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  }),
);
app.use(express.json());

app.get("/", (request, response) => {
  response.json({
    message: "Dev Match backend is running",
  });
});

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
