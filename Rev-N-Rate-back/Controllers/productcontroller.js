import Brand from "../Models/Brand.js";
import Product from "../Models/Product.js";
import ProductSchema from "../validators/productsValidator.js";
const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.findAll();
    res.status(200).json({
      Status: "Success",
      Message: "Products found successfully",
      data: allProducts,
    });
  } catch (err) {
    res.status(500).json({
      Status: "Error",
      Message: err,
    });
  }
};
const getOneProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(403).json({
        Status: "Error",
        Message: "Product Id is Required",
      });
    }
    const existingProduct = await Product.findOne({ where: { productId } });
    if (!existingProduct) {
      return res.status(404).json({
        Status: "Error",
        Message: "Product Not Found",
      });
    }
    res.status(200).json({
      Status: "Success",
      Message: "Product found",
      data: existingProduct,
    });
  } catch (err) {
    res.status(500).josn({
      Status: "Error",
      Message: err,
    });
  }
};
const addProduct = async (req, res) => {
  try {
    const { error } = ProductSchema.validate(req.body);
    if (error) {
      return res.status(403).json({
        Status: "Error",
        Message: error.details[0].message,
      });
    }
    const { brandId, name, price, offerId, photos, detail, categoryId } =
      req.body;
    const product = await Product.create({
      brandId,
      name,
      price,
      offerId,
      photos,
      detail,
      categoryId,
    });
    res.status(201).json({
      Status: "Success",
      Message: "Product Added Succesfully",
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      Status: "Error",
      Message: err,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(403).json({
        Status: "Error",
        Message: "Product Id is Required",
      });
    }

    const existingProduct = await Product.findOne({ where: { productId } });
    if (!existingProduct) {
      return res.status(404).json({
        Status: "Error",
        Message: "Product Not Found",
      });
    }

    const { error } = ProductSchema.validate(req.body);
    if (error) {
      return res.status(403).json({
        Status: "Error",
        Message: error.message,
      });
    }

    const { brandId, name, price, offerId, photos, detail, categoryId } = req.body;

    const updatedProduct = await Product.update(
      {
        brandId,
        name,
        price,
        offerId,
        categoryId,
        photos,
        detail,
      },
      { where: { productId } }
    );
    const newProduct = await Product.findOne({ where: { productId } });
    res.status(200).json({
      Status: "Success",
      Message: "Product updated Successfully",
      data: newProduct,
    });
  } catch (err) {
    res.status(500).json({
      Status: "Error",
      Message: err.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(403).json({
        Status: "Error",
        Message: "Product Id is Required",
      });
    }
    const existingProduct = await Product.findOne({ where: { productId } });
    if (!existingProduct) {
      return res.status(404).json({
        Status: "Error",
        Message: "Product Not Found",
      });
    }
    await Product.destroy({ where: { productId } });
    res.status(200).json({
      Status: "Success",
      Message: "Product Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      Status: "Error",
      Message: err,
    });
  }
};
const addLike = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res
        .status(403)
        .json({ Status: "error", Message: "Please enter a productId" });
    }
    const product = await Product.findByPk(productId);
    if (!product) {
      return res
        .status(404)
        .json({ Status: "error", Message: "Product not found" });
    }
    product.likes += 1;
    await product.save();
    res.status(200).json({
      Status: "Success",
      Message: "Like added successfully",
      data: product,
    });
  } catch (err) {
    res.status(500).json({ Status: "Error", Message: err.message });
  }
};
const addDisLike = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res
        .status(403)
        .json({ Status: "error", Message: "Please enter a productId" });
    }
    const product = await Product.findByPk(productId);
    if (!product) {
      return res
        .status(404)
        .json({ Status: "error", Message: "Product not found" });
    }
    product.dislikes += 1;
    await product.save();
    res.status(200).json({
      Status: "Success",
      Message: "disLike added successfully",
      data: product,
    });
  } catch (err) {
    res.status(500).json({ Status: "Error", Message: err.message });
  }
};
const getProductRate = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res
        .status(404)
        .json({ Status: "error", Message: "Product not found" });
    }
    let likes = product.likes;
    let dislikes = product.dislikes;
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
    product.rate = rate;
    await product.save();
    res
      .status(201)
      .json({ Status: "Success", Message: "Rate of the product", data: rate });
  } catch (err) {
    res.status(500).json({ Status: "Error", Message: err.message });
  }
};
const getBrandProducts = async (req, res) => {
  try {
    const {brandId} = req.params;
    const brand = await Brand.findByPk(brandId);
    if (!brand) {
      return res.status(404).json({ "Status": "Not Found", "Message": "Brand Not Found" })
    }
    const brandProducts = await Product.findAll({ where: { brandId } });
    res.status(200).json({ "Status": "Found", "Message": "Brand Products", "data": brandProducts });
  } catch (err) {
    res.status(500).json({ Status: "Error", Message: err.message });
  }
}
export {
  getAllProducts,
  addProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
  addLike,
  addDisLike,
  getProductRate,
  getBrandProducts
};
