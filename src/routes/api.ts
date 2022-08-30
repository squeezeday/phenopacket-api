import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
import protobuf from "protobufjs";
import path from "path";
import md5 from "md5";
import protobufroot from "../protobufroot";

const prisma = new PrismaClient();
var router = express.Router();

// app.get("/api/phenopacket", async (req, res) => {
//   const { query, skip, take, orderBy } = req.query;
//   const where = query
//     ? {
//         OR: [{ hash: { contains: query as string } }],
//       }
//     : {};
//   const rows = await prisma.phenoPacket.findMany({
//     take: Number(take) || undefined,
//     skip: Number(skip) || undefined,
//     where,
//     orderBy: {
//       updatedAt: orderBy as Prisma.SortOrder,
//     },
//   });
//   res.json(rows);
// });

router.get("/phenopacket/:hash", async (req, res) => {
  const { hash }: { hash?: string } = req.params;
  try {
    const row = await prisma.phenopacket.findUniqueOrThrow({
      where: { hash },
    });
    return res.json(row);
  } catch (error) {
    if (error instanceof Prisma.NotFoundError) {
      return res.status(404).send("Not found");
    } else {
      console.error(error);
    }
  }
  return res.status(500);
});

router.post("/phenopacket", async (req, res) => {
  const dto = req.body;

  const Phenopacket = protobufroot?.lookupType(
    "org.phenopackets.schema.v2.Phenopacket"
  );
  const packetError = Phenopacket?.verify(dto);
  if (packetError) {
    return res.status(400).json({ message: packetError });
  }
  const hash = md5(dto);

  const entity = await prisma.phenopacket.create({
    data: { data: dto, hash },
  });
  res.status(201).json(entity);
});

router.put("/phenopacket/:hash", async (req, res) => {
  const { body } = req;
  const { hash }: { hash?: string } = req.params;
  const response = await prisma.phenopacket.upsert({
    where: { hash },
    create: { data: body, hash },
    update: body,
  });
  res.json(response);
});

export default router;
