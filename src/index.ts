import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./config/database";
import * as dotenv from "dotenv";
import { error } from "console";

dotenv.config();

const app = express();
const PORT = parseInt(process.env.DB_PORT || "5432");

app.use(bodyParser.json());
app.use("/api/devices");

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.error("Error initializing database", error));
