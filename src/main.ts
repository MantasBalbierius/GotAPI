import { app } from "./app";
import * as http from "http";
import * as mongoose from "mongoose";
import { getEnv } from "./env";

const PORT = getEnv().SERVER_PORT;
const MONGO_URI = getEnv().MONGO_URL;
const server = http.createServer(app);
server.listen(PORT);
server.on("listening", async () => {
  console.info(`Listening on port ${PORT}`);
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
  mongoose.connection.once("open", () => {
    console.info("Connected to MongoDB");
  });
  mongoose.connection.on("error", (err: any) => {
    console.error(err);
  });
});
