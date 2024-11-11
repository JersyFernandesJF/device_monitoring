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
import { SocketEventHandler } from "./sockets/socket.events";

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

const socketEventHandler = new SocketEventHandler(io);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.send("Server Message");

  socket.on("message", (msg) => {
    console.log("Message received:", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconected:", socket.id);
  });
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}/api/devices`);
    });
  })
  .catch((error) => console.error("Error initializing the database:", error));

  export { io, socketEventHandler }