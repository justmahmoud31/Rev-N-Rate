import Joi from "joi";
const BrandSchema = Joi.object({
  brandName: Joi.string().required(),
  categoryId: Joi.number().required(),
  logo: Joi.string().optional(),
  brandEmail: Joi.string().optional(),
  brandPassword: Joi.string().min(6).optional(),
  websiteLink: Joi.string().optional(),
  photos: Joi.string().optional(),
  active: Joi.number().required(),
  subscription: Joi.string().required(),
  detail : Joi.string().optional()
});
export default  BrandSchema;