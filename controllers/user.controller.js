const User = require("../models/User");

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Ocultar contraseñas
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
};

// Actualizar rol de un usuario
exports.updateRole = async (req, res) => {
    const { role } = req.body;

    if (!["admin", "user"].includes(role)) {
        return res.status(400).json({ error: "Rol inválido" });
    }

    try {
        const updated = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        ).select("-password");

        if (!updated) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json({ message: "Rol actualizado", user: updated });

    } catch (err) {
        res.status(500).json({ error: "Error al actualizar rol" });
    }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "Usuario eliminado" });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar usuario" });
    }
};
