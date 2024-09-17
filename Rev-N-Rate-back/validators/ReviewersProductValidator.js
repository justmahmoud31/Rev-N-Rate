import Joi from "joi";
const ReviewersProductSchema = Joi.object({
    reviewerId : Joi.number().required()
});
export default ReviewersProductSchema;