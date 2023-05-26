import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { follow, getFollowers, getFollowings } from "../controllers/followers.controllers.js";

const followersRouter = Router();

followersRouter.get("/following", authValidation, getFollowings);
followersRouter.get("/followers", authValidation, getFollowers);
followersRouter.post("/follow", authValidation, follow);

export default followersRouter;