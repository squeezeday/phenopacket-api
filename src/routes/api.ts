import express from "express";
import multer from "multer";
import protobufroot from "../protobufroot";
import PhenopacketModel from "../model/phenopacket";
import FileModel from "../model/file";
import FormDataModel from "../model/formdata";
import hash from "object-hash";
import { generate } from "generate-password-ts";

var router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * Get phenopacket by hash
 */
router.get("/phenopacket", async (req, res) => {
  const { hash: _hash }: { hash?: string } = req.query;
  if (_hash) {
    try {
      const entity = await PhenopacketModel.find({ _hash });
      if (!entity) return res.status(404).send("Not found");
      return res.json(entity);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal server error");
    }
  }
  return res.status(400).send("Bad query");
});

/**
 * Get phenopacket by id
 */
router.get("/phenopacket/:id", async (req, res) => {
  try {
    const entity = await PhenopacketModel.findById(req.params.id);
    if (!entity) return res.status(404).send("Not found");
    return res.json(entity);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).send("Not found");
    }
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

/**
 * Save new phenopacket
 */
router.post("/phenopacket", async (req, res) => {
  const { _id, _hash, id, __v, ...dto } = req.body;

  const Phenopacket = protobufroot?.lookupType(
    "org.phenopackets.schema.v2.Phenopacket"
  );
  const packetError = Phenopacket?.verify(dto);
  if (packetError) {
    return res.status(400).json({ message: packetError });
  }

  try {
    const _hash = hash(dto, { algorithm: "md5" });
    const entity = new PhenopacketModel({ ...dto, _hash });
    await entity.save();
    return res.status(201).json(entity);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

/**
 * Save formdata
 */
router.post("/formdata", async (req, res) => {
  const { id, _id, __v, ...dto } = req.body;
  try {
    const password = generate({ length: 12 });
    const entity = new FormDataModel({ ...dto, password });
    await entity.save();
    return res.status(201).json(entity);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

/**
 * Fetch formdata by phenopacket id
 */
router.get("/formdata/:id", async (req, res) => {
  const { id }: { id?: string } = req.params;
  const { password }: { password?: string } = req.query;
  try {
    const entity = await FormDataModel.findOne({ phenopacketId: id });
    if (!entity) return res.status(404).send("Not found");
    if (password !== entity.password)
      return res.status(403).send("Incorrect password");
    return res.json(entity);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

/**
 * Get uploaded file by id
 */
router.get("/render-file/:id", upload.single("file"), async (req, res) => {
  const { id }: { id?: string } = req.params;
  const file = await FileModel.findById(id);
  if (!file) return res.status(404).send();
  return res.header("Content-Type", file.mimetype).end(file.data);
});

/**
 * Upload file
 */
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
    return res.status(500).send("Internal server error");
  }
});

export default router;
