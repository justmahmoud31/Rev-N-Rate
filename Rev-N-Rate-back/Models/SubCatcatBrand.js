import { Model,DataTypes } from "sequelize";
import Brand from './Brand.js';
import sequelize from '../config/database.js';
import Category from './Category.js';
import SubCategory from "./SubCategory.js";
class SubCatCatBrand extends Model {}
SubCatCatBrand.init({
    subCategoryId  :{
        type:DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model:SubCategory,
            key:"subCategoryId"
        },
        allowNull:false
    },
    categoryId :{
        type:DataTypes.INTEGER,
        references:{
            model:Category,
            key:"categoryId"
        },
        allowNull:false
    },
    brandId :{
        type:DataTypes.INTEGER,
        references:{
            model:Brand,
            key:"brandId"
        },
        allowNull:true
    }
},{
    sequelize,
    modelName: "SubCatCatBrand",
    tableName: "SubCatCatBrand",
    timestamps: false,
})
export default SubCatCatBrand;