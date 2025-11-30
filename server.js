require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar BD
connectDB();

// Rutas
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/chat", require("./routes/chat.routes"));
app.use("/api/users", require("./routes/user.routes"));

// Socket.io
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: { origin: "*" }
});

io.on("connection", (socket) => {
    console.log("🟢 Cliente conectado:", socket.id);

    socket.on("message", (msg) => {
        io.emit("message", msg);
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log("🚀 API lista en puerto", PORT));
