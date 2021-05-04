import express, { NextFunction, Request, Response } from "express";
import { AdController } from "~/controllers/adController";
import { AdFilterParams, PaginationParams } from "~/helpers/types";

const router = express.Router();
const controller = new AdController();

router.get("/", async (req: Request, res: Response) => {
  /**
   * TODO:
   * # filter ads by:
   * - different bot attributes:
   *    + (done) political affiliation: &political=0&political=4
   *    + (done) gender: &gender=male&gender=female (i.e. male OR female)
   *    + location
   *    + age when encountered ads (more difficult)
   * - (done) tags: &tag=fashion&tag=entertainment
   * - dates when ads where seen (more difficult)
   *
   * # sort ads:
   */
  let { offset, limit, political, gender, tag } = req.query;

  // TODO: Testing needed to confirm different combinations of query params work
  const queryParams = {
    offset: offset ? parseInt(offset as string) : 0,
    limit: limit ? parseInt(limit as string) : 30,
    political:
      typeof political === "string" ? [political] : (political as string[]),
    gender: typeof gender === "string" ? [gender] : (gender as string[]),
    tag: typeof tag === "string" ? [tag] : (tag as string[]),
  };
  if (queryParams.offset < 0 || queryParams.limit < 0) {
    res.send([]);
    return;
  }
  console.log(queryParams);
  res.send(await controller.getAll(queryParams));
  return;
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
