import * as express from "express";
import * as cors from "cors";

import { requestLoggerMiddleware } from "./request.logger.middleware";
import "./controller";

import { RegisterRoutes } from "./routes";
import * as swaggerUi from "swagger-ui-express";

const app = express();
app.use(cors());
app.use(express.json());

app.use(requestLoggerMiddleware);
RegisterRoutes(app);

try {
  const swaggerDocument = require("../swagger.json");
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (err) {
  console.error("Unable to read swagger.json", err);
}

app.get("*", function(req, res) {
  res.redirect("/docs");
});

export { app };
