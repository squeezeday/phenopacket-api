import express from "express";
import md5 from "md5";
import protobufroot from "../protobufroot";
import PhenopacketModel from "../model/phenopacket";

var router = express.Router();

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
  const _hash = md5(dto);

  try {
    const entity = new PhenopacketModel({ ...dto, _hash });
    await entity.save();
    return res.status(201).json(entity);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal error");
  }
});

export default router;
