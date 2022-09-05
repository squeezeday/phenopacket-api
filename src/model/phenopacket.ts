import mongoose from "mongoose";

const schema = new mongoose.Schema({ _hash: String }, { strict: false });
const model = mongoose.model("Phenopacket", schema);

export default model;
