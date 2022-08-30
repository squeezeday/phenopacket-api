import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
import protobuf from "protobufjs";
import path from "path";
import md5 from "md5";
import api from "./routes/api";

const prisma = new PrismaClient();
const app = express();
const swaggerUi = require("swagger-ui-express");

app.use(express.json());

const swaggerSpec = require("../apischema.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", async (req, res) => {
  res.send("OK");
});

app.use("/api/v1", api);

const server = app.listen(3000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`)
);
