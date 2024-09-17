import { Model,DataTypes } from "sequelize";
import Reviewer from "../Models/Reviewer.js";
import {Offers} from '../Models/offers.js';
import sequelize from '../config/database.js';
class ReviewersOffers extends Model{}
ReviewersOffers.init({
    reviewerId: {
        type: DataTypes.INTEGER,
        references: {
          model: Reviewer,
          key: "reviewerId",
        },
        allowNull: false,
      },
      offersId: {
        type: DataTypes.INTEGER,
        references: {
          model: Offers,
          key: "offersId",
        },
      },
      savedID: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
},{
    
    sequelize,
    modelName: "ReviewersOffers",
    tableName: "ReviewersOffers",
    timestamps: false,
}
)
export default ReviewersOffers;