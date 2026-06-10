const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const uploads = require("./utils/upload.js");
const routes = require("./view/routes");
const { db } = require("./databases/DatabaseContext.js");

dotenv.config();

const Port = process.env.API_PORT || 3650;
const app = express();

app.use(cors({
    origin: [
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use(
    "/uploads",
    express.static(path.resolve(__dirname, "..", "uploads"))
);

app.post("/upload", uploads.single("avatar"), (req, res) => {
    if (!req.file) {
        res.send("Erro ao fazer upload do arquivo!");
    } else {
        res.send("Arquivo enviado com sucesso!");
    }
});

app.use(routes);

async function startServer() {
    try {
        console.log(`iniciando banco de dados: ${process.env.DB_TYPE}`);

        await db.init();

        app.listen(Port, () => {
            console.log(`Servidor rodando na porta: ${Port}`);
            console.log("Pressione CTRL+C para cancelar servidor!");
        });

    } catch (error) {
        console.error("Erro ao iniciar servidor:", error);
    }
}

startServer();

