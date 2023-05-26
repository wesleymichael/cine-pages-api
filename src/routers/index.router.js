import { Router } from "express";
import postsRouter from "./posts.routes.js";
import authRouter from "./auth.router.js";
import followersRouter from "./followers.router.js";

const router = Router();

router.use(authRouter);
router.use(postsRouter);
router.use(followersRouter);

export default router;
