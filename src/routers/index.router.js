import { Router } from "express";
import postsRouter from "./posts.routes.js";
import authRouter from "./auth.router.js";

const router = Router();

router.use(authRouter);
router.use(postsRouter);

export default router;
