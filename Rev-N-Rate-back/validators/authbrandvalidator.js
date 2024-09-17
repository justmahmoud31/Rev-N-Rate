import Joi from 'joi';

const brandSignupSchema = Joi.object({
    brandName: Joi.string().required(),
    categoryId: Joi.number().integer().required(),
    brandEmail: Joi.string().email().required(),
    brandPassword: Joi.string().min(6).required(),
    logo: Joi.string().uri().optional(),
    websiteLink: Joi.string().uri().optional(),
    photos: Joi.string().optional(),
    active: Joi.number().valid(0, 1).required(),
    subscription: Joi.string().required(),
    detail: Joi.string().optional(),
});

const brandLoginSchema = Joi.object({
    brandEmail: Joi.string().email().required(),
    brandPassword: Joi.string().min(6).required(),
});

export { brandSignupSchema, brandLoginSchema };
