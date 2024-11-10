import "reflect-metadata";
import express from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./config/database";
import * as dotenv from "dotenv";
import { errorHandler } from "./middlwares";
import deviceRoutes from "./routes/device.routes";
import http from "http";
const cors = require("cors");
import { Server } from "socket.io";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use("/api/devices", deviceRoutes);
app.use(errorHandler);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Usuário conectado:", socket.id);

  socket.send("Mensagem do servidor");

  socket.on("message", (msg) => {
    console.log("Mensagem recebida:", msg);
  });

  socket.on("disconnect", () => {
    console.log("Usuário desconectado:", socket.id);
  });
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    server.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}/api/devices`);
    });
  })
  .catch((error) => console.error("Erro ao inicializar o banco de dados:", error));

  export { io }