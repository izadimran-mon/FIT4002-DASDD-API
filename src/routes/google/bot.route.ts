import express, { NextFunction, Request, Response } from "express";
import { BotController } from "~/controllers/botController";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const controller = new BotController();
  try {
    res.send(await controller.getAll());
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:username",
  async (req: Request, res: Response, next: NextFunction) => {
    const controller = new BotController();
    const { username } = req.params;
    try {
      res.send(await controller.getByUsername(username));
    } catch (err) {
      next(err);
    }
  }
);

export { router as googleBotRoute };
