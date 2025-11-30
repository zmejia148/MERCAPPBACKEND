const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("🔥 MongoDB Atlas conectado correctamente");
    } catch (error) {
        console.error("❌ Error al conectar con MongoDB:", error);
        process.exit(1); // Detiene la app si falla la conexión
    }
};

module.exports = connectDB;
