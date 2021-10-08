const fs = require("fs");
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Image = require("./models/image");
const multer = require("multer");
const { sendImages } = require("./tools/functions");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("uploads"));
app.use(express.static("client/build"));
dotenv.config();

const fileExtensions = ["image/jpeg", "image/jpg", "image/png", "image/svg"];

//define storage for the images
const storage = multer.diskStorage({
  //destination for files
  destination: function (request, file, callback) {
    callback(null, "./uploads");
  },

  //add back the extension
  filename: function (request, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

//upload parameters for multer
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (!fileExtensions.includes(file.mimetype)) {
      callback(null, false);
    } else {
      callback(null, true);
    }
  },
});

app.get("/api/", (req, res) => {
  sendImages(req, res);
});
app.post("/api/", upload.single("image"), (req, res) => {
  if (req.file) {
    console.log(req.file.filename);
    console.log(req.body.label);
    const image = new Image({
      label: req.body.label,
      name: req.file.filename,
    });
    image
      .save()
      .then((result) => {
        sendImages(req, res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.delete("/api/", (req, res) => {
  try {
    fs.unlinkSync(path.join(__dirname, "/uploads/", req.body.name));
    Image.findByIdAndDelete(req.body.id)
      .then((result) => {
        sendImages(req, res);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.error(err);
  }
});
app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

const port = process.env.PORT;

mongoose
  .connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(port, () => {
      console.log("server running on port " + port);
    });
  })
  .catch((err) => console.log(err));
