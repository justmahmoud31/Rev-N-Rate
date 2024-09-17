import Joi from "joi";
const ReviewersBrandSchema = Joi.object({
    reviewerId : Joi.number().required(),
});
export default ReviewersBrandSchema;