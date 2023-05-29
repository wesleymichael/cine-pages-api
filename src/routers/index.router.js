import { Router } from "express";
import postsRouter from "./posts.routes.js";
import authRouter from "./auth.router.js";
import followersRouter from "./followers.router.js";
import userRouter from "./user.router.js";

const router = Router();

router.use(authRouter);
router.use(postsRouter);
router.use(followersRouter);
router.use(userRouter);

export default router;
