const router = require("express").Router();
const { test } = require("../controllers/devController");

router.post("/test", test);

module.exports = router;