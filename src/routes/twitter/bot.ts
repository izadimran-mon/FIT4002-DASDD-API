import express, { NextFunction, Request, Response } from "express";
import { TwitterBotController } from "~/controllers";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const controller = new TwitterBotController();
  try {
    res.send(await controller.getAll());
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:username",
  async (req: Request, res: Response, next: NextFunction) => {
    const controller = new TwitterBotController();
    const { username } = req.params;
    try {
      res.send(await controller.getByUsername(username));
    } catch (err) {
      next(err);
    }
  }
);

export { router as twitterBotRoute };
