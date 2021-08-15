const { v4: uuidv4 } = require('uuid');

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.redirect(`/${uuidv4()}`);
});

router.get("/:room", (req, res) => {
    res.render('room', { roomId: req.params.room });
});

module.exports = router;