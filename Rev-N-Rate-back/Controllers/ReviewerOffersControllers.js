import { Offers } from "../Models/offers.js";
import Reviewer from "../Models/Reviewer.js";
import ReviewersOffers from "../Models/ReviwersOffers.js";
import ReviewersOffersSchema from "../validators/ReviewerOffersValidator.js";
const addFavOffer = async (req, res) => {
  try {
    const { offersId } = req.params;
    const { reviewerId } = req.body;
    const { error } = ReviewersOffersSchema.validate(req.body);
    if (error) {
      return res
        .status(403)
        .json({ Status: "Error", Message: error.details[0].message });
    }

    // Check if the reviewer and offer exist
    const existingOffer = await Offers.findByPk(offersId);
    const existingReviewer = await Reviewer.findByPk(reviewerId);

    if (!existingReviewer) {
      return res
        .status(404)
        .json({ Status: "NOT FOUND", Message: "Reviewer Not Found" });
    }

    if (!existingOffer) {
      return res
        .status(404)
        .json({ Status: "NOT FOUND", Message: "Offer Not Found" });
    }

    // Create the revieweroffer entry
    const revieweroffer = await ReviewersOffers.create({
      offersId,
      reviewerId,
    });

    return res.status(201).json({
      Status: "Success",
      Message: "Favorite Offer Added",
      data: revieweroffer,
    });
  } catch (err) {
    return res.status(500).json({ Status: "Error", Message: err.message });
  }
};

const getFavOffers = async (req, res) => {
  try {
    const { reviewerId } = req.params;
    const existingReviewer = await Reviewer.findByPk(reviewerId);
    if (!existingReviewer) {
      return res
        .status(404)
        .json({ Status: "NOT FOUND", Message: "Reviewer Not Found" });
    }
    const AllFavOffers = await ReviewersOffers.findAll({
      where: { reviewerId },
    });
    res.status(200).json({
      Status: "Success",
      Message: "Found Successfully",
      data: AllFavOffers,
    });
  } catch (err) {
    return res.status(500).json({ Status: "Error", Message: err.message });
  }
};
const deleteFavOffers = async (req, res) => {
  try {
    const { savedId } = req.params;
    const existingOffer = await ReviewersOffers.findByPk(savedId);
    if (!existingOffer) {
      return res
        .status(404)
        .json({ Status: "Not Found", Message: "Offer Not Found" });
    }
    await ReviewersOffers.destroy({ where: { savedId } });
    return res.status(200).json({
      Status: "Success",
      Message: "Favorite Offer Deleted",
    });
  } catch (err) {
    return res.status(500).json({ Status: "Error", Message: err.message });
  }
};

export default { addFavOffer, getFavOffers, deleteFavOffers };
