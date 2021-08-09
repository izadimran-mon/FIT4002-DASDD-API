import express from "express";
import { googleAdRoute } from "./ad.route";
import { googleBotRoute } from "./bot.route";
import { googleStatRoute } from "./stat.route";
import { googleTagRoute } from "./tag.route";

const router = express.Router();

router.use("/bots", googleBotRoute);
router.use("/ads", googleAdRoute);
router.use("/tags", googleTagRoute);
router.use("/stats", googleStatRoute);

export { router as googleRoute };
