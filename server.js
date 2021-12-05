const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const multer = require("multer");
const apiRoutes = require("./routes/api");

const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("./uploads"));
app.use(express.static("./client/build"));

const supportedFiles = ["image/jpeg", "image/jpg", "image/png", "image/svg"];
const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, path.join(__dirname, "/uploads"));
  },

  filename: function (request, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (!supportedFiles.includes(file.mimetype)) {
      callback(null, false);
    } else {
      callback(null, true);
    }
  },
});

app.use("/api/", upload.single("image"), apiRoutes);

const port = process.env.PORT;
mongoose
  .connect(process.env.DBURL)
  .then((result) => {
    app.listen(port, () => {
      console.log("server running on port " + port);
    });
  })
  .catch((err) => console.log(err));
