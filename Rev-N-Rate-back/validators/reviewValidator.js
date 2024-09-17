import Joi from "joi";

const ReviewSchema = Joi.object({
  brandId: Joi.number().optional(),
  productId: Joi.number().optional(),
  reviewerId: Joi.number().optional(),
  comments: Joi.string().required(),
  photos: Joi.any().optional(),
  quality: Joi.number().required(),
  service: Joi.number().required()
});

export default ReviewSchema;
