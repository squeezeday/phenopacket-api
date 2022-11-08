import path from "path";
import protobuf from "protobufjs";

const file = path.join("phenopackets/schema/v2/phenopackets.proto");
const protodir = path.join(
  __dirname + "/../phenopacket-schema/src/main/proto/"
);
console.log("protodir", protodir);
const root = new protobuf.Root();
root.resolvePath = (origin, target) => {
  const path = protodir + target;
  return path;
};
root.loadSync(file);
root.resolveAll();

export default root;
