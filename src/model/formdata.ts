import mongoose from "mongoose";

const schema = new mongoose.Schema(
  { password: String },
  {
    strict: false,
    id: true,
  }
);
schema.set("toJSON", {
  virtuals: true,
});
const model = mongoose.model("FormData", schema);

export default model;
