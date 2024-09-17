import ReviewersBrand from "../Models/ReviewersBrand.js";
import ReviewersBrandSchema from "../validators/ReviewersBrandValidator.js";
import Brand from "../Models/Brand.js";
import Reviewer from "../Models/Reviewer.js";
const getFavBrands = async (req, res) => {
  try {
    const { reviewerId } = req.params;
    const existingReviewer = await Reviewer.findByPk(reviewerId);
    if (!existingReviewer) {
      return res
        .status(404)
        .json({ Status: "NOT FOUND", Message: "Reviewer Not Found" });
    }
    const AllFavBrands = await ReviewersBrand.findAll({
      where: { reviewerId },
    });
    res
      .status(200)
      .json({ Status: "Success", Message: "Found", data: AllFavBrands });
  } catch (err) {
    res.status(500).json({ Status: "Error", Message: err });
  }
};
const addFavBrand = async (req, res) => {
  try {
    const { brandId } = req.params;
    const { reviewerId } = req.body;
    const { error } = ReviewersBrandSchema.validate(req.body);
    if (error) {
      return res
        .status(403)
        .json({ Status: "Error", Message: error.details[0].message });
    }
    const existingBrand = await Brand.findByPk(brandId);
    const existingReviewer = await Reviewer.findByPk(reviewerId);
    if (!existingReviewer) {
      return res
        .status(404)
        .json({ Status: "NOT FOUND", Message: "Reviewer Not Found" });
    }
    if (!existingBrand) {
      return res
        .status(404)
        .json({ Status: "NOT FOUND", Message: "Brand Not Found" });
    }
    const reviewerBrand = await ReviewersBrand.create({
      brandId,
      reviewerId,
    });
    return res.status(201).json({
      Status: "Success",
      Message: "Favorite Brand Added",
      data: reviewerBrand,
    });
  } catch (err) {
    return res.status(500).json({ Status: "Error", Message: err.message });
  }
};
const deleteFavBrand = async (req, res) => {
  try {
    const { savedID } = req.params;
    const existingFavBrand = await ReviewersBrand.findByPk(savedID);
    if (!existingFavBrand) {
      return res
        .status(404)
        .json({ Status: "NOT FOUND", Message: "Brand Not Found" });
    }
    await ReviewersBrand.destroy({ where: { savedID } });
    return res.status(201).json({
      Status: "Success",
      Message: "Favorite Brand Removed",
    });
  } catch (err) {
    return res.status(500).json({ Status: "Error", Message: err.message });
  }
};
export default { getFavBrands, addFavBrand,deleteFavBrand };
