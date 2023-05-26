import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { getFollowers, getFollowings } from "../controllers/followers.controllers.js";

const followersRouter = Router();

followersRouter.get("/following", authValidation, getFollowings);
followersRouter.get("/followers", authValidation, getFollowers)

export default followersRouter;