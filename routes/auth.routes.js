const router = require("express").Router();
const auth = require("../controllers/auth.controller.js");

// Registro de usuario (user o admin)
router.post("/register", auth.register);

// Login de usuario (retorna token + rol)
router.post("/login", auth.login);

module.exports = router;
