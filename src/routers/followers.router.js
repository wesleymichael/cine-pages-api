import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { follow, getFollowers, getFollowings, unfollow } from "../controllers/followers.controllers.js";

const followersRouter = Router();

followersRouter.get("/following/:username", authValidation, getFollowings);
followersRouter.get("/followers/:username", authValidation, getFollowers);
followersRouter.post("/follow", authValidation, follow);
followersRouter.delete("/unfollow", authValidation, unfollow);

export default followersRouter;