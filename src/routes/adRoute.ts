import express, { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { AdController } from "~/controllers/adController";
import { Ad, AdTag } from "~/models";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const controller = new AdController();
  res.send(await controller.getAll());
});

// router.get("/create-tag", async (req: Request, res: Response) => {
//   const tagIds = [1, 2, 3, 4];
//   const ads = await Ad.find({
//     select: ["id"],
//     take: 50000,
//   });

//   const manager = getManager();

//   let adTags: AdTag[] = [];
//   for (const ad of ads) {
//     const tag = tagIds[Math.floor(Math.random() * tagIds.length)];
//     const adTag = getRepository(AdTag).create({
//       tagId: tag,
//       adId: ad.id,
//     });
//     adTags.push(adTag);
//   }
//   await manager.save(adTags, { chunk: 1000 });
//   res.send(200);
// });
router.get("/:id", async (req: Request, res: Response) => {
  const controller = new AdController();
  const { id } = req.params;
  res.send(await controller.getById(id));
});

export { router as adRoute };
