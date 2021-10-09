const { apiGet, apiPost, apiDelete } = require("../controllers/api");
const express = require("express");
const router = express.Router();

router.get("/", apiGet);
router.post("/", apiPost);
router.delete("/", apiDelete);

module.exports = router;
