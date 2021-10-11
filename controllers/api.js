const fs = require("fs");
const path = require("path");
const Image = require("../models/image");

function sendImages(req, res) {
  Image.find()
    .sort({ updatedAt: -1 })
    .then((result) => {
      const images = result.map((image) => {
        return {
          id: image._id,
          url: process.env.URL + image.name,
          label: image.label,
          name: image.name,
          secretWord: image.secretWord,
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
    const image = new Image({
      label: req.body.label,
      name: req.file.filename,
      secretWord: req.body.secretWord,
    });
    image
      .save()
      .then((result) => {
        res.json({
          id: result._id,
          url: process.env.URL + result.name,
          label: result.label,
          name: result.name,
          secretWord: result.secretWord,
        });
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
        res.json({
          id: result._id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.error(err);
  }
}

module.exports = { apiGet, apiPost, apiDelete };
