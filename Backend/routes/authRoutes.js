const express = require("express");

const router = express.Router();

router.post("/register", (req, res) => {
  res.json({
    message: "Register route is working",
    data: req.body,
  });
});

module.exports = router;