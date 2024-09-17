import Joi from "joi";
const offersSchema =Joi.object({
    details:Joi.string().optional(),
    photo:Joi.string().required(),
    promoCode:Joi.string().required(),
    brandId:Joi.number().required()
});
export {offersSchema};