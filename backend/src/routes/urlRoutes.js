import { Router } from "express";
import { getDashboardStats, getOriginalUrl, urlShortner } from "../controllers/urlController.js";

const router = Router();

router.post("/", urlShortner);
router.get("/dashboard/:shortUrl", getDashboardStats);
router.get("/:shortLink", getOriginalUrl);

export default router;