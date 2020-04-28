import path from "path";
const resolve = function (dir: string): string {
  return path.join(__dirname, "..", dir);
};

export default {
  resolve,
};
