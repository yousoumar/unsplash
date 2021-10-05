const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));
dotenv.config();

app.get("/", (req, res) => {
  res.send("<p>Hello World</p>");
});
app.get("/api", (req, res) => {
  res.json({ message: "Hello Word" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
