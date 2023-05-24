import Joi from "joi";

export const signupSchema = Joi.object({
    username: Joi.string().regex(/^[\w]+$/).min(1).max(100).required(),
    img: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(50).required()
});

export const signinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(50).required()
});