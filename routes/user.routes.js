const router = require("express").Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Todas estas rutas solo las usa un ADMIN
router.get("/", authMiddleware.verifyAdmin, userController.getAllUsers);
router.put("/:id/role", authMiddleware.verifyAdmin, userController.updateRole);
router.delete("/:id", authMiddleware.verifyAdmin, userController.deleteUser);

module.exports = router;
