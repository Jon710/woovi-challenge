import path from "path";
import dotenvSafe from "dotenv-safe";

const cwd = process.cwd();
const root = path.join.bind(cwd);

dotenvSafe.config({
  path: root(".env"),
  sample: root(".env.example"),
});

const config = {
  PORT: process.env.PORT ?? 4000,
  MONGO_URI: process.env.MONGO_URI ?? "",
};

export { config };