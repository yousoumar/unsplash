const fs = require("fs");
const path = require("path");
const Image = require("../models/image");

function sendImages(req, res) {
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
}

function apiGet(req, res) {
  sendImages(req, res);
}

function apiPost(req, res) {
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
}

function apiDelete(req, res) {
  try {
    fs.unlinkSync(path.join(__dirname, "../uploads/", req.body.name));
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
}

module.exports = { apiGet, apiPost, apiDelete };
