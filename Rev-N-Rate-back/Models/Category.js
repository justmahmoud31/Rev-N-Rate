import { Model,DataTypes } from "sequelize";
import sequelize from "../config/database.js";
class Category extends Model {}
Category.init({
    categoryId : {
        type : DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    categoryName : {
        type:DataTypes.STRING,
        allowNull:false,
    },
    categoryPic :{
        type:DataTypes.STRING,
        allowNull:true
    }
},{
    sequelize,
    modelName:'Category',
    tableName:'Category',
    timestamps: false
})
export default {Category};