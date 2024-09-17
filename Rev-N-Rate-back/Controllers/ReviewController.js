import Brand from "../Models/Brand.js";
import Review from "../Models/Review.js";
import Reviewer from "../Models/Reviewer.js";
import ReviewSchema from "../validators/reviewValidator.js";
const getBrandreviews = async (req, res) => {
  try {
    const { brandId } = req.params;
    if (!brandId) {
      return res
        .status(404)
        .json({ Status: "Not Found", Message: "Brand Not Found" });
    }

    const reviews = await Review.findAll({
      where: {
        brandId: brandId,
      },
      include: [
        {
          model: Reviewer, 
          as: 'reviewer', 
          attributes: ['username'], 
        },
      ],
    });

    if (reviews.length === 0) {
      return res.status(404).json({
        Status: "Not Found",
        Message: "No reviews found for this brand",
      });
    }

    res.status(200).json({
      Status: "Success",
      Data: reviews,
    });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res
        .status(404)
        .json({ Status: "Not Found", Message: "Product Not Found" });
    }
    const reviews = await Review.findAll({
      where: {
        productId: productId,
      },
    });
    if (reviews.length === 0) {
      return res.status(404).json({
        Status: "Not Found",
        Message: "No reviews found for this Product",
      });
    }
    res.status(200).json({
      Status: "Success",
      Data: reviews,
    });
  } catch (err) {
    res.status(500).json({ Status: "error", Message: err.message });
  }
};
//add review
const addBrandReview = async (req, res) => {
  try {
    const { brandId } = req.params;
    if (!brandId) {
      return res
        .status(404)
        .json({ Status: "Not Found", Message: "Brand Not Found" });
    }

    const { comments, quality, service, reviewerId } = req.body;
    const { error } = ReviewSchema.validate({
      comments,
      quality,
      service,
      reviewerId
    });

    if (error) {
      return res
        .status(403)
        .json({ Status: "error", Message: error.details[0].message });
    }
    const photo = req.file ? req.file.buffer : null;
    const review = await Review.create({
      comments,
      brandId,
      quality,
      service,
      photos: photo, 
      reviewerId,
    });

    res.status(200).json({
      Status: "Success",
      Message: "Review added Successfully",
      data: review,
    });
  } catch (err) {
    res.status(500).json({ Status: "Error", Message: err.message });
  }
};


const addProductReview = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res
        .status(404)
        .json({ Status: "Not Found", Message: "Product Not Found" });
    }

    const { comments, photos, quality, service, reviewerId } = req.body;
    const { error } = ReviewSchema.validate(req.body);
    if (error) {
      return res
        .status(403)
        .json({ Status: "error", Message: error.details[0].message });
    }
    const photoArray = Array.isArray(photos) ? photos : [photos];

    const review = await Review.create({
      comments,
      productId,
      quality,
      service,
      photos: photoArray,
      reviewerId,
    });

    res.status(200).json({
      Status: "Success",
      Message: "Review added Successfully",
      data: review,
    });
  } catch (err) {
    res.status(500).json({ Status: "Error", Message: err.message });
  }
};

const addLike = async (req, res) => {
  try {
    const { reviewId } = req.params;
    if (!reviewId) {
      return res
        .status(403)
        .json({ Status: "error", Message: "Please enter a reviewId" });
    }
    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res
        .status(404)
        .json({ Status: "error", Message: "Review not found" });
    }
    review.likes += 1;
    await review.save();
    res.status(200).json({
      Status: "Success",
      Message: "Like added successfully",
      data: review,
    });
  } catch (err) {
    res.status(500).json({ Status: "Error", Message: err.message });
  }
};
const addDislike = async (req, res) => {
  try {
    const { reviewId } = req.params;
    if (!reviewId) {
      return res
        .status(403)
        .json({ Status: "error", Message: "Please enter a reviewId" });
    }
    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res
        .status(404)
        .json({ Status: "error", Message: "Review not found" });
    }
    review.dislikes += 1;
    await review.save();
    res.status(200).json({
      Status: "Success",
      Message: "disLike added successfully",
      data: review,
    });
  } catch (err) {
    res.status(500).json({ Status: "Error", Message: err.message });
  }
};

const getPopularReviews = async (req, res) => {
  try {
    const popularReviews = await Review.findAll({
      order: [["likes", "DESC"]],
      limit: 8,
      include: [
        {
          model: Brand,
          attributes: ["brandName", "logo"],
        },
        {
          model: (await import('../Models/Reviewer.js')).default,
          as: 'reviewer',
          attributes: ["profilePic"], 
         
        },
      ],
    });
    res.status(200).json({
      Status: "Success",
      Message: "Popular reviews retrieved successfully",
      data: popularReviews,
    });
  } catch (err) {
    res.status(500).json({ Status: "Error", Message: err.message });
  }
};

const EditBrandReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { error } = ReviewSchema.validate(req.body);
    if (error) {
      return res
        .status(403)
        .json({ Status: "Error", Message: error.details[0].message });
    }
    const existingReview = await Review.findByPk(reviewId);
    if (!existingReview) {
      return res
        .status(404)
        .json({ Status: "Error", Message: "Review Not Found" });
    }
    const { comments, photos, quality, service, reviewerId } = req.body;
    await Review.update(
      {
        comments,
        photos,
        quality,
        service,
        reviewerId,
      },
      {
        where: { reviewId },
      }
    );
    const updatedReview = await Review.findByPk(reviewId);
    res.status(200).json({
      Status: "Success",
      Message: "Review Updated Successfully",
      data: updatedReview,
    });
  } catch (err) {
    res.status(500).json({ Status: "Error", Message: err.message });
  }
};
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const existingReview = await Review.findByPk(reviewId);
    if (!existingReview) {
      return res
        .status(404)
        .json({ Status: "Error", Message: "Review Not Found" });
    }
    await Review.destroy({ where: { reviewId } });
    res
      .status(200)
      .json({ Status: "Sucess", Message: "Review deleted sucessfully" });
  } catch (err) {
    res.status(500).json({ Status: "Error", Message: err.message });
  }
};
const getReviewRate = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findByPk(reviewId);

    if (!review) {
      return res
        .status(404)
        .json({ Status: "Error", Message: "Review Not Found" });
    }
    let likes = review.likes;
    let dislikes = review.dislikes;
    const calculateRating = (likes, dislikes) => {
      const totalVotes = likes + dislikes;
      if (totalVotes === 0) {
        return 0;
      }
      const ratio = likes / totalVotes;
      const rating = ratio * 5;
      return rating;
    };
    let rate = calculateRating(likes, dislikes);
    res
      .status(201)
      .json({ Status: "Success", Message: "Rate of the review", data: rate });
  } catch (err) {
    res.status(500).json({ Status: "Error", Message: err.message });
  }
};
export default {
  getBrandreviews,
  getProductReviews,
  addBrandReview,
  addProductReview,
  addLike,
  addDislike,
  getPopularReviews,
  EditBrandReview,
  deleteReview,
  getReviewRate,
};
