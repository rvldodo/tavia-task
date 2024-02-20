import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import logger from "./utils/logger.js";
import { DB_DIALECT, DB_HOST, DB_NAME, DB_PORT, PORT } from "./secret.js";
import { Sequelize } from "sequelize";
import { errorMiddleware } from "./middlewares/error.js";
import router from "./api/index.js";

//import passport strategies
import passportStrategies from "./services/passport.strategies.js";

// import sequelize
const sequelize = new Sequelize(
  `${DB_DIALECT}://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
);

const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passportStrategies.initialize());

app.use("/api", router);

app.use(errorMiddleware);

app.listen(PORT, async () => {
  logger.info(`Server running on port ${PORT}`);
  await sequelize.authenticate();
  logger.info(`Database connected successfuly`);
});
