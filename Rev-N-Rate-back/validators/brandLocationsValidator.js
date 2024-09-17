import Joi from "joi";
const BrandLocationsSchema = Joi.object({
    brandId : Joi.number().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    street : Joi.string().required(),
    workingDays: Joi.string().required(),
    startHour : Joi.date().required(),
    endHour : Joi.date().required()
});
export default BrandLocationsSchema;