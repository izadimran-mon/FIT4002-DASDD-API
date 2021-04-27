import express, { NextFunction, Request, Response } from "express";
import { StatController, TagController } from "~/controllers/index";

const router = express.Router();
const controller = new StatController();

router.get("/bot-alignment", async (req: Request, res: Response) => {
  res.send(await controller.getBotAlignmentStat());
});

export { router as statRoute };
