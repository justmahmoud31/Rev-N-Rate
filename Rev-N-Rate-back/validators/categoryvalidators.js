import Joi from "joi";
const CategorySchema = Joi.object({
    categoryName : Joi.string().required(),
    categoryPic : Joi.string()
})
export default {CategorySchema};