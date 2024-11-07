import "reflect-metadata";
import express from "express"
import * as bodyParser from "body-parser"
import { AppDataSource } from "./config/database";
import * as dotenv from "dotenv";
import { errorHandler } from "./middlwares";
import deviceRoutes from "./routes/device.routes";

dotenv.config();

const app = express()
const PORT = 3000;

app.use(bodyParser.json());
app.use("/api/devices", deviceRoutes);

app.use(errorHandler);

AppDataSource.initialize()
  .then(async() => {
    console.log("Database connected");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}/api/devices`)
    );
  })
  .catch((error) => console.error("Error initializing database", error));
