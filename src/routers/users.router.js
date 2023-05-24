import { Router } from "express";
import { signup } from "../controllers/users.controllers.js";
import { validadeSchema } from "../middlewares/validateSchema.middleware.js";
import { signupSchema } from "../schemas/users.schemas.js";

const userRouter = Router();

//Criar as rotas relacionadas à users
userRouter.post("/sign-up", validadeSchema(signupSchema), signup);

export default userRouter;
