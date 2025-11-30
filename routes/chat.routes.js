const router = require("express").Router();

router.get("/", (req, res) => {
    res.json({ message: "Chat API OK" });
});

module.exports = router;
