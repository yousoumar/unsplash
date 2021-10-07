const fs = require("fs");
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Image = require("./models/image");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("uploads"));
app.use(express.static("client/build"));
dotenv.config();

app.get("/api/", (req, res) => {
  Image.find()
    .then((result) => {
      const images = result.map((image) => {
        return {
          id: image._id,
          url: process.env.URL + image.name,
          label: image.label,
          name: image.name,
        };
      });
      res.json({ images });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/api/", (req, res) => {
  console.log(req.body);
  try {
    fs.unlinkSync(path.join(__dirname, "/uploads/", req.body.name));
  } catch (err) {
    console.error(err);
  }
  Image.findByIdAndDelete(req.body.id)
    .then((result) => {
      Image.find().then((result) => {
        const images = result.map((image) => {
          return {
            id: image._id,
            url: process.env.URL + image.name,
            label: image.label,
          };
        });
        res.json({ images });
      });
    })
    .catch((err) => {
      console.log(err);
    });
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
