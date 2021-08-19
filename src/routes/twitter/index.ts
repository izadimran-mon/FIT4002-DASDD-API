import express from "express";
import { twitterAdRoute } from "./ad";
import { twitterBotRoute } from "./bot";
import { twitterStatRoute } from "./stats";
import { twitterTagRoute } from "./tag";

const router = express.Router();

router.use("/bots", twitterBotRoute);
router.use("/ads", twitterAdRoute);
router.use("/tags", twitterTagRoute);
router.use("/stats", twitterStatRoute);

export { router as twitterRoute };
