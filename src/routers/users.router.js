import { Router } from "express";
import { signin, signup } from "../controllers/users.controllers.js";
import { validadeSchema } from "../middlewares/validateSchema.middleware.js";
import { signinSchema, signupSchema } from "../schemas/users.schemas.js";
import { validateSignin } from "../middlewares/user.middleware.js";

const userRouter = Router();

//Criar as rotas relacionadas à users
userRouter.post("/sign-up", validadeSchema(signupSchema), signup);
userRouter.post("/sign-in", validadeSchema(signinSchema), validateSignin, signin);

export default userRouter;
