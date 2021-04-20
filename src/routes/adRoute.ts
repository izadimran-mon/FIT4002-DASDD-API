import express, { Request, Response } from "express";
import { AdController } from "~/controllers/adController";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const controller = new AdController();
  res.send(await controller.getAll());
});

router.get("/:id", async (req: Request, res: Response) => {
  const controller = new AdController();
  const { id } = req.params;
  res.send(await controller.getById(id));
});

export { router as adRoute };
