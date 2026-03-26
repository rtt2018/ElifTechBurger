import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(16).required(),
  email: Joi.string().email().max(128).required(),
  phone: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().max(128).required(),
  phone: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .required(),
});

export const JWTAuth = Joi.object({
  email: Joi.string().email().max(128).required(),
});
