import { DataTypes, Model } from "sequelize";
import Reviewer from "../Models/Reviewer.js";
import Product from "./Product.js";
import sequelize from '../config/database.js';
class ReviewersProduct extends Model {}
ReviewersProduct.init(
  {
    reviewerId: {
      type: DataTypes.INTEGER,
      references: {
        model: Reviewer,
        key: "reviewerId",
      },
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "productId",
      },
    },
    savedID: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "ReviewersProduct",
    tableName: "ReviewersProduct",
    timestamps: false,
  }
);
export default ReviewersProduct;