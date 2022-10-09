import express from "express";
import md5 from "md5";
import multer from "multer";
import protobufroot from "../protobufroot";
import PhenopacketModel from "../model/phenopacket";
import FileModel from "../model/file";
import mongoose from "mongoose";

var router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/phenopacket", async (req, res) => {
  const { hash: _hash }: { hash?: string } = req.query;
  if (_hash) {
    try {
      const entity = await PhenopacketModel.find({ _hash });
      if (!entity) return res.status(404).send("Not found");
      return res.json(entity);
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  }
  return res.status(400).send("Bad query");
});

router.get("/phenopacket/:id", async (req, res) => {
  const { id }: { id?: string } = req.params;
  try {
    const entity = await PhenopacketModel.findById(id);
    if (!entity) return res.status(404).send("Not found");
    return res.json(entity);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
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

  try {
    const _hash = md5(dto);
    const entity = new PhenopacketModel({ ...dto, _hash });
    await entity.save();
    return res.status(201).json(entity);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal error");
  }
});

router.get("/render-file/:id", upload.single("file"), async (req, res) => {
  const { id }: { id?: string } = req.params;
  const file = await FileModel.findById(id);
  if (!file) return res.status(404).send();
  return res.header("Content-Type", file.mimetype).end(file.data);
});

router.post("/file", upload.single("file"), async (req, res) => {
  const { file } = req;
  try {
    if (!file) throw new Error("Missing file");
    const entity = new FileModel({
      data: file.buffer,
      name: file.originalname,
      size: file.size,
      mimetype: req.file.mimetype,
    });
    await entity.save();
    const { _id, name, size, mimetype } = entity;
    return res.status(201).json({
      _id,
      name,
      size,
      mimetype,
      url: `${process.env.API_URL}/api/v1/render-file/${_id}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal error");
  }
});

export default router;
