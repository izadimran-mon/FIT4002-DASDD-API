import express, { Request, Response } from "express";
import { BotController } from "~/controllers/botController";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const controller = new BotController();
  res.send(await controller.getAll());
});

router.get("/:username", async (req: Request, res: Response) => {
  const controller = new BotController();
  const { username } = req.params;
  res.send(await controller.getByUsername(username));
});

export { router as botRoute };
