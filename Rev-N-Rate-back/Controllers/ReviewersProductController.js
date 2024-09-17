import ReviewersProduct from "../Models/ReveiwersProduct.js";
import Product from "../Models/Product.js";
import ReviewersProductSchema from "../validators/ReviewersProductValidator.js";
import Reviewer from "../Models/Reviewer.js";
const AddFavProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { reviewerId } = req.body;
    const { error } = ReviewersProductSchema.validate(req.body);
    if (error) {
      return res
        .status(403)
        .json({ Status: "Error", Message: error.details[0].message });
    }
    const existingProduct = await Product.findByPk(productId);
    const existingReviewer = await Reviewer.findByPk(reviewerId);
    if (!existingReviewer) {
      return res
        .status(404)
        .json({ Status: "NOT FOUND", Message: "Reviewer Not Found" });
    }
    if (!existingProduct) {
      return res
        .status(404)
        .json({ Status: "NOT FOUND", Message: "Product Not Found" });
    }
    const { ReviewersFavProduct } = ReviewersProduct.create({
      reviewerId,
      productId,
    });
    return res.status(201).json({
      Status: "Success",
      Message: "Favorite Product Added",
      Data: ReviewersFavProduct,
    });
  } catch (err) {
    res.status(500).json({ Status: "Error", Message: err.message });
  }
};
const getAllFavProducts = async (req, res) => {
  try {
    const { reviewerId } = req.params;
    const existingReviewer = await Reviewer.findByPk(reviewerId);
    if (!existingReviewer) {
      return res
        .status(404)
        .json({ Status: "NOT FOUND", Message: "Reviewer Not Found" });
    }
    const AllFavProducts = await ReviewersProduct.findAll({
      where: { reviewerId },
    });
    res
      .status(200)
      .json({ Status: "Success", Message: "Found", data: AllFavProducts });
  } catch (err) {
    res.status(500).json({ Status: "Error" });
  }
};
const deleteFavProduct = async(req,res)=>{
    try{
        const {savedID} = req.params;
        const existingFavProduct = await Product.findByPk(savedID);
        if(!existingFavProduct){
          return res.status(404).json({
            Status: "Not Found",
            Message: "Favorite product Not Found",
          });
        }
        await ReviewersProduct.destroy({where : {savedID}});
        return res.status(201).json({
          Status: "Success",
          Message: "Favorite Product Removed",
        });
    }catch(err){
      return res.status(500).json({ Status: "Error", Message: err.message });
    }
}
export default {AddFavProduct,getAllFavProducts,deleteFavProduct};