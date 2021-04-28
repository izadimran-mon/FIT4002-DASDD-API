import express, { Request, Response } from "express";
import { StatController } from "~/controllers/index";

const router = express.Router();
const controller = new StatController();

router.get("/bot-alignment", async (req: Request, res: Response) => {
  res.send(await controller.getBotAlignmentStat());
});

router.get("/category", async (req: Request, res: Response) => {
  res.send(await controller.getCategoryStat());
});

router.get("/ad-count", async (req: Request, res: Response) => {
  const startDate = req.query.startDate
    ? new Date(parseInt(req.query.startDate as string))
    : new Date();
  res.send(await controller.getAdCounts(startDate));
});

/**
 * example return:
 * {"adTotal":137303,"adTagged":80492,"adPerBot":5720.958333333333}
 */
router.get("/ad-stat", async (req: Request, res: Response) => {
  res.send(await controller.getAdStats());
});
export { router as statRoute };
