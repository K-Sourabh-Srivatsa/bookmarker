const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const { connectToMongoDB } = require("./connection");
const bookmarksRouter = require("./routes/bookmarks");
const tagsRouter = require("./routes/tags");
const userRouter = require("./routes/users");

const app = express();
const PORT = process.env.BACKEND_PORT;
const url = process.env.MONGODB_URL;

connectToMongoDB(url)
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => console.log(err));

const corsOptions = {
  origin: "*",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middlewares
// app.use(express.urlencoded({ extended: false })); // For Form Data
app.use(express.json()); // For JSON Data
app.use(cors(corsOptions));

// Routes
app.use("/api/bookmarks", bookmarksRouter);
app.use("/api/tags", tagsRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () =>
  console.log(`Server started at Port: ${PORT}, go to http://localhost:${PORT}`)
);
