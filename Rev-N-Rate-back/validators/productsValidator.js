import Joi from "joi";
const ProductSchema = Joi.object({
	brandId: Joi.number().required(),
    name  : Joi.string().required(),
    price : Joi.number().optional(),
    offerId: Joi.number().optional(),
    categoryId : Joi.number().required(),
    rate:Joi.number().optional(),
    photos : Joi.string().required(),
    likes: Joi.number().optional(),
    dislikes:Joi.number().optional(),
    detail : Joi.string().optional()  
})
export default ProductSchema;