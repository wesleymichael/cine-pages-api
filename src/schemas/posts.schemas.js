import Joi from "joi";

export const newPostSchema = Joi.object({
    description: Joi.string().required().max(500),
    img: Joi.string().required(),
});