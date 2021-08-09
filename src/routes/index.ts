import express from "express";
import { googleRoute } from "./google";
import { twitterRoute } from "./twitter";

const router = express.Router();

// Old routes for Google data, for compatibility with current frontend
router.use("/", googleRoute);

// New routes for Google data
router.use("/google", googleRoute);
router.use("/twitter", twitterRoute);

export { router as apiRoute };
