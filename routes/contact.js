const express = require("express");

const contactRequest = require('../request/contact');
const router = express.Router();

router.get("/", contactRequest.getData);

router.get("/:id",contactRequest.getDataID);

module.exports = router;