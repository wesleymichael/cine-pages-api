import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { getFollowings } from "../controllers/followers.controllers.js";

const followersRouter = Router();

followersRouter.get("/following", authValidation, getFollowings);

export default followersRouter;