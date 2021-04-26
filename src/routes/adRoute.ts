import express, { NextFunction, Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { AdController } from "~/controllers/adController";
import { Ad, AdTag } from "~/models";

const router = express.Router();
const controller = new AdController();

router.get("/", async (req: Request, res: Response) => {
  res.send(await controller.getAll());
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    res.send(await controller.getById(id));
  } catch (err) {
    next(err);
  }
});

router.post(
  "/:id/tags/:tagId",
  async (req: Request, res: Response, next: NextFunction) => {
    let { id, tagId } = req.params;
    try {
      await controller.addTagToAd(id, parseInt(tagId));
      res.send(await controller.getById(id));
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:id/tags/:tagId",
  async (req: Request, res: Response, next: NextFunction) => {
    let { id, tagId } = req.params;
    try {
      await controller.deleteTagFromAd(id, parseInt(tagId));
      res.send(await controller.getById(id));
    } catch (err) {
      next(err);
    }
  }
);

export { router as adRoute };
