const User = require("../models/User");
const jwt = require("jsonwebtoken");

// =========================
//  REGISTRO
// =========================
exports.register = async (req, res) => {
    try {
        console.log("📩 BODY RECIBIDO:", req.body);

        const { username, password, role } = req.body;

        const assignedRole = ["admin", "user"].includes(role) ? role : "user";

        const user = await User.create({
            username,
            password,
            role: assignedRole
        });

        res.json({ message: "Usuario registrado correctamente" });

    } catch (error) {
        console.error("❌ ERROR EN REGISTER:", error);
        res.status(500).json({ error: "Error al registrar", details: error.message });
    }
};

// =========================
// LOGIN
// =========================
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Buscar usuario
        const user = await User.findOne({ username });

        if (!user)
            return res.status(404).json({ error: "Usuario no encontrado" });

        // Comparar contraseña usando el método del modelo
        const isMatch = await user.comparePassword(password);

        if (!isMatch)
            return res.status(400).json({ error: "Contraseña incorrecta" });

        // Crear token con datos del usuario
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login exitoso",
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        });

    } catch (error) {
        console.error("❌ ERROR EN LOGIN:", error);
        res.status(500).json({ error: "Error en el servidor", details: error.message });
    }
};
