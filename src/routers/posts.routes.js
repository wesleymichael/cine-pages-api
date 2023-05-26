import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { createPost, getPosts, getPostsByUsername, like } from "../controllers/posts.controllers.js";
import { validadeSchema } from "../middlewares/validateSchema.middleware.js";
import { newPostSchema } from "../schemas/posts.schemas.js";

const postsRouter = Router();

postsRouter.post("/new-post", authValidation, validadeSchema(newPostSchema), createPost);
postsRouter.get("/posts", authValidation, getPosts);
postsRouter.get("/posts/:username", authValidation, getPostsByUsername);
postsRouter.post("/like/:postId", authValidation, like);

export default postsRouter;