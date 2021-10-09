const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const multer = require("multer");
const apiRoutes = require("./routes/api");
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("./uploads"));
app.use(express.static("./views/build"));
dotenv.config();

const fileExtensions = ["image/jpeg", "image/jpg", "image/png", "image/svg"];
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
    if (!fileExtensions.includes(file.mimetype)) {
      callback(null, false);
    } else {
      callback(null, true);
    }
  },
});

app.use("/api/", upload.single("image"), apiRoutes);

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
