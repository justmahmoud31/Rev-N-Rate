import Joi from "joi";
const ReviewerOffersSchema = Joi.object({
    reviewerId : Joi.number().required(),
})
export default ReviewerOffersSchema;