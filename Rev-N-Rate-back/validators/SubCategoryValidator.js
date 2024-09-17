import Joi from "joi";
const SubCategorySchema = Joi.object({
    subCategoryName:Joi.string().required(),
    subCategoryPic: Joi.string().required() 
})
export default SubCategorySchema;
