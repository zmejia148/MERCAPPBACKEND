const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");
const { authenticate, authorize } = require("../middleware/auth");

// Rutas públicas
router.get("/", controller.getAll);
router.get("/:id", controller.getOne);

// Rutas solo admin
router.post("/", authenticate, authorize("admin"), controller.create);
router.put("/:id", authenticate, authorize("admin"), controller.update);
router.delete("/:id", authenticate, authorize("admin"), controller.remove);

module.exports = router;
