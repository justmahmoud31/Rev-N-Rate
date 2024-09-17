import { DataTypes, Model } from "sequelize";
import Reviewer from "../Models/Reviewer.js";
import Brand from "../Models/Brand.js";
import sequelize from '../config/database.js';
class ReviewersBrand extends Model {}
ReviewersBrand.init(
  {
    reviewerId: {
      type: DataTypes.INTEGER,
      references: {
        model: Reviewer,
        key: "reviewerId",
      },
      allowNull: false,
    },
    brandId: {
      type: DataTypes.INTEGER,
      references: {
        model: Brand,
        key: "brandId",
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
    modelName: "ReviewersBrand",
    tableName: "ReviewersBrand",
    timestamps: false,
  }
);
export default ReviewersBrand;