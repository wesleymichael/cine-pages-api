import { Router } from "express";
import { getUsersFilter } from "../controllers/users.controllers.js";

const userRouter = Router();

userRouter.get("/users", getUsersFilter);

export default userRouter;