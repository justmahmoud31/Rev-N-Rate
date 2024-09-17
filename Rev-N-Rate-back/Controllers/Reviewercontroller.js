import Brand from "../Models/Brand.js";
import Review from "../Models/Review.js";

import Reviewer from "../Models/Reviewer.js";
import { registerSchema } from "../validators/authValidator.js";


const getReviewer = async (req, res) => {
  try {
    const { reviewerId } = req.params;
    const reviewer = await Reviewer.findByPk(reviewerId);
    if (!reviewer) {
      return res.status(404).json({ "Status": "Not Found", "Message": "Reviewer Not Found" });
    }
    res.status(200).json({
      "Status": "Found", "Message": "Reviewer Found",
      "data": reviewer
    })
  } catch (err) {
    res.status(500).json({ "Status": "Error", "Message": err });
  }
}
const updateReviewerProfile = async (req, res) => {
  try {
    const { reviewerId } = req.params;
    const reviewer = await Reviewer.findByPk(reviewerId);
    if (!reviewer) {
      return res.status(404).json({ "Status": "Not Found", "Message": "Reviewer Not Found" });
    }
    const { username, email, password, profilePic, phone } = req.body;
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(403).json({ "Status": "Error", "Message": error.details[0].message });
    }
    const newReviewerProfile = await Reviewer.update({ username, email, password, profilePic, phone }, { where: { reviewerId } });
    const updatedProfile = await Reviewer.findByPk(reviewerId);
    res.status(201).json({ "Status": "updated", "Message": "Reviewer Profile Updated", "data": updatedProfile });
  } catch (err) {
    res.status(500).json({ "Status": "Error", "Message": err });
  }
}
const deleteReviewerAccount = async (req, res) => {
  try {
    const { reviewerId } = req.params;
    const reviewer = await Reviewer.findByPk(reviewerId);
    if (!reviewer) {
      return res.status(404).json({ "Status": "Not Found", "Message": "Reviewer Not Found" });
    }
    await Reviewer.destroy({ where: { reviewerId } });
    res.status(201).json({ "Status": "Done", "Message": "Reviewer Account Removed" });
  } catch (err) {
    res.status(500).json({ "Status": "Error", "Message": err });
  }
}
const BlockReviewer = async (req, res) => {
  try {
    const { reviewerId } = req.params;
    const reviewer = await Reviewer.findByPk(reviewerId);
    if (!reviewer) {
      return res.status(404).json({ message: "Reviewer not found" });
    }
    reviewer.isBlocked = 1;
    await reviewer.save();
    res.status(200).json({ message: "Reviewer blocked successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const unblockReviewer = async (req, res) => {
  try {
    const { reviewerId } = req.params;
    const reviewer = await Reviewer.findByPk(reviewerId);
    if (!reviewer) {
      return res.status(404).json({ message: "Reviewer not found" });
    }
    reviewer.isBlocked = 0;
    await reviewer.save();
    res.status(200).json({ message: "Reviewer unblocked successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const ReviewerRate = async (req, res) => {
  try {
    const { reviewerId } = req.params;
    const reviewer = await Reviewer.findByPk(reviewerId);
    if (!reviewer) {
      return res.status(404).json({ "Status": "Not Found", "Message": "Reviewer Not Found" });
    }
    const reviewerReviews = await Review.findAll({ where: { reviewerId } });
    const totalLikes = reviewerReviews.reduce((acc, review) => acc + review.likes, 0);
    const totalDislikes = reviewerReviews.reduce((acc, review) => acc + review.dislikes, 0);
    if (reviewerReviews.length >= 100 && totalLikes > totalDislikes) {
      reviewer.isTrusted = 1;
      await reviewer.save();
    }
    else {
      reviewer.isTrusted = 0;
      await reviewer.save();
    }
    const calculateRating = (likes, dislikes) => {
      const totalVotes = likes + dislikes;
      if (totalVotes === 0) {
        return 0;
      }
      const ratio = likes / totalVotes;
      const rating = ratio * 5;
      return rating;
    };
    const rate = calculateRating(totalLikes, totalDislikes);
    reviewer.points = rate;
    await reviewer.save()
    res
      .status(201)
      .json({
        Status: "Success",
        Message: "Rate of the reviewer",
        data: rate,
        Likes: totalLikes,
        disLikes: totalDislikes,
      });

  } catch (err) {
    res.status(500).json({ Status: "Error", Message: err.message });
  }
};
const ReviewerReviews = async (req, res) => {
  try {
    const { reviewerId } = req.params;
    const Reviews = await Review.findAll({
      where: { reviewerId },
      include: [
        {
          model: Brand,
          attributes: ['brandName', 'logo'], 
        }
      ]
    });
    res.status(200).json({
      Status: "Found",
      Message: "Reviews Found",
      data: Reviews
    });
  } catch (err) {
    res.status(500).json({ Status: "Error", Message: err.message });
  }
};

export default { ReviewerRate, BlockReviewer, unblockReviewer, getReviewer, deleteReviewerAccount, ReviewerReviews, updateReviewerProfile };
