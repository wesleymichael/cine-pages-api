import { Router } from "express";
import { logout, signin, signup } from "../controllers/users.controllers.js";
import { validadeSchema } from "../middlewares/validateSchema.middleware.js";
import { signinSchema, signupSchema } from "../schemas/users.schemas.js";
import { validateSignin } from "../middlewares/user.middleware.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";

const userRouter = Router();

userRouter.post("/sign-up", validadeSchema(signupSchema), signup);
userRouter.post("/sign-in", validadeSchema(signinSchema), validateSignin, signin);
userRouter.post("/logout", authValidation, logout);

export default userRouter;
