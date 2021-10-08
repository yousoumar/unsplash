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
module.exports = { sendImages };
