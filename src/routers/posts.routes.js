import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { createPost, getPosts } from "../controllers/posts.controllers.js";
import { validadeSchema } from "../middlewares/validateSchema.middleware.js";
import { newPostSchema } from "../schemas/posts.schemas.js";

const postsRouter = Router();

postsRouter.post("/new-post", authValidation, validadeSchema(newPostSchema), createPost);
postsRouter.get("/posts", authValidation, getPosts);

export default postsRouter;