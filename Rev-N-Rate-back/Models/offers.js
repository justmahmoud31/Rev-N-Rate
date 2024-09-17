import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Brand from "./Brand.js";

class Offers extends Model {}

Offers.init({
  offersId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  details: {
    type: DataTypes.STRING,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  promoCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brandId: {
    type: DataTypes.INTEGER,
    references: {
      model: Brand,
      key: "brandId",
    },
  },
}, {
  sequelize,  
  modelName: "Offers",
  tableName: "Offers",
  timestamps: false,
});

export  { Offers };
