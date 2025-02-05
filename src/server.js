// environment variables
require("dotenv").config();

//imports
const express = require("express");
const morgan = require("morgan"); // HTTP request logger

// import routes
const authRoutes = require("./routes/auth/authRoutes");
const usersRoutes = require("./routes/users/usersRoutes");

// App
const app = express();

// middleware dev (log http requests)
app.use(morgan("dev"));

// middleware (json)
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

// error handling (no match)
app.use((req, res, next) => {
  res.status(404).json({ message: "Not FOUND" });
});

// error handling (general)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

// start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
