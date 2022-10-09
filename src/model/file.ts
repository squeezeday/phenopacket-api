import mongoose from "mongoose";

const schema = new mongoose.Schema(
  { name: String, size: Number, data: Buffer, mimetype: String },
  { strict: false }
);
const model = mongoose.model("File", schema);

export default model;
