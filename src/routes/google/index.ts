import express from "express";
import { googleAdRoute } from "./ad";
import { googleBotRoute } from "./bot";
import { googleStatRoute } from "./stat";
import { googleTagRoute } from "./tag";

const router = express.Router();

router.use("/bots", googleBotRoute);
router.use("/ads", googleAdRoute);
router.use("/tags", googleTagRoute);
router.use("/stats", googleStatRoute);

export { router as googleRoute };
