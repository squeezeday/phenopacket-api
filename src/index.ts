import express from "express";
import api from "./routes/api";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { Server } from "http";
import cors from "cors";

dotenv.config();

const app = express();
const swaggerUi = require("swagger-ui-express");

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
  })
);

const swaggerSpec = require("../apischema.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/status", async (req, res) => {
  const { readyState } = mongoose.connection;
  res.status(readyState === 1 ? 200 : 500).send({
    status: readyState === 1 ? "OK" : "",
    version: "1.1.0",
    readyState,
  });
});
app.use("/api/v1", api);

async function main() {
  try {
    console.debug("Connecting to mongodb");
    const db = await mongoose.connect(process.env.DATABASE_URL, {
      connectTimeoutMS: 1000,
    });
    console.debug("Connected to mongodb");

    const port = process.env.PORT || 3000;
    const server: Server = app.listen(port, () =>
      console.log(`🚀 Server ready at: http://localhost:${port}`)
    );
  } catch (error) {
    throw error;
  }
}
main();
