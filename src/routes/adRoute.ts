import express, { NextFunction, Request, Response } from "express";
import { AdController } from "~/controllers/adController";
import { AdFilterParams, PaginationParams } from "~/helpers/types";

const router = express.Router();
const controller = new AdController();

router.get("/", async (req: Request, res: Response) => {
  let {
    offset,
    limit,
    political,
    gender,
    tag,
    bots,
    startDate,
    endDate,
  } = req.query;
  /**
   * Input validation
   *
   * TODO: Testing needed to confirm different combinations of query params work
   * TODO: possible refactoring using express-validator?
   */
  const queryParams = {
    offset: offset ? parseInt(offset as string) : 0, // page offset
    limit: limit ? parseInt(limit as string) : 30, // number of items in response
    political:
      typeof political === "string" ? [political] : (political as string[]),
    gender: typeof gender === "string" ? [gender] : (gender as string[]),
    tag: typeof tag === "string" ? [tag] : (tag as string[]),
    bots: typeof bots === "string" ? [bots] : (bots as string[]),
    startDate:
      typeof startDate === "string"
        ? new Date(parseInt(startDate as string))
        : null,
    endDate:
      typeof endDate === "string"
        ? new Date(parseInt(endDate as string))
        : null,
  };

  // Invalid negative offset and limit, return a blank array
  if (queryParams.offset < 0 || queryParams.limit < 0) {
    res.send([]);
    return;
  }
  console.log(queryParams);


  // Update the response with the Links data
  let response = await controller.getAll(queryParams)

  let originalURL = req.originalUrl

  // for self link
  response.metaData.Links.self = originalURL
  // for first link
  response.metaData.Links.first= originalURL.replace(String(queryParams.offset), "0")
  // for last link
  response.metaData.Links.last = originalURL.replace(String(queryParams.offset), String(Math.floor(response.metaData.total_count/response.metaData.per_page)*response.metaData.per_page))
  // for next link
  const nextOffset = queryParams.offset + response.metaData.per_page
  if(nextOffset < response.metaData.total_count){
    response.metaData.Links.next = originalURL.replace(String(queryParams.offset), String(queryParams.offset + response.metaData.per_page))
  }
  else{
    response.metaData.Links.next = originalURL
  }
  // for previous link
  const previousOffset = queryParams.offset - response.metaData.per_page
  if(previousOffset > 0){
    response.metaData.Links.previous = originalURL.replace(String(queryParams.offset), String(previousOffset))
  }
  else{
    response.metaData.Links.previous = originalURL
  }

  // Return response
  res.send(response);
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
