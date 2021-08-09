import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { EntityNotFoundError, getConnection } from "typeorm";
import { config } from "~/configs/config";
import { TryDBConnect } from "~/helpers/dbConnection";
import {
  googleBotRoute,
  googleAdRoute,
  googleTagRoute,
  googleStatRoute,
} from "./routes/index";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./swaggerDoc/index.swagger";

const initServer = async () => {
  const app: express.Application = express();
  app.use(
    cors({
      origin: [config.CLIENT_ORIGIN], // allow to server to accept request from different origin
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      credentials: true, // allow session cookie from browser to pass through
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(async (req: Request, res: Response, next) => {
    await TryDBConnect(() => {
      res.json({
        error: "Database connection error, please try again later",
      });
    }, next);
  });

  // Health check route for AWS
  app.get("/health", (req, res) => {
    res.status(200).send("Server is running");
  });

  app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Setting up routes
  // Old route for Google data
  app.use("/bots", googleBotRoute);
  app.use("/ads", googleAdRoute);
  app.use("/tags", googleTagRoute);
  app.use("/stats", googleStatRoute);

  // New route for Google data
  app.use("/google/bots", googleBotRoute);
  app.use("/google/ads", googleAdRoute);
  app.use("/google/tags", googleTagRoute);
  app.use("/google/stats", googleStatRoute);

  // Route for Twitter data

  // Catching errors
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    if (err instanceof EntityNotFoundError) {
      res.status(404).send({ error: err.name, message: err.message });
    } else {
      res.status(404).send({ error: err.name, message: err.message });
    }
  });

  // Just checking if given PORT variable is an integer or not
  let port = parseInt(config.PORT || "");
  if (isNaN(port) || port === 0) {
    port = 8888;
  }

  app.listen(port, () => {
    console.log(`Server Started at: http://localhost:${port}`);
  });
};

initServer();
