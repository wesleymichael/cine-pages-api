import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { createPost } from "../controllers/posts.controllers.js";
import { validadeSchema } from "../middlewares/validateSchema.middleware.js";
import { newPostSchema } from "../schemas/posts.schemas.js";

const postsRouter = Router();

postsRouter.post("/new-post", authValidation, validadeSchema(newPostSchema), createPost);

export default postsRouter;