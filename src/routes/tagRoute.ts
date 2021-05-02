import express, { NextFunction, Request, Response } from "express";
import { TagController } from "~/controllers/index";

const router = express.Router();
const controller = new TagController();

router.get("/", async (req: Request, res: Response) => {
  res.send(await controller.getAll());
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  try {
    res.send(await controller.getById(id));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  // TODO: input sanitisation and formatting?
  let { name } = req.body;
  name = String(name).toLowerCase();
  try {
    res.send(await controller.createTag(name));
  } catch (err) {
    // TODO: consider returning a self-defined error instead of using TypeORM one
    next(err);
  }
});
export { router as tagRoute };
