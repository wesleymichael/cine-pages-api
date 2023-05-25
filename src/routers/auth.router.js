import { Router } from "express";
import { logout, signin, signup } from "../controllers/auth.controllers.js";
import { validadeSchema } from "../middlewares/validateSchema.middleware.js";
import { signupSchema } from "../schemas/users.schemas.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { signinSchema } from "../schemas/auth.schemas.js";

const authRouter = Router();

authRouter.post("/signup", validadeSchema(signupSchema), signup);
authRouter.post("/signin", validadeSchema(signinSchema), signin);
authRouter.post("/logout", authValidation, logout);

export default authRouter;
