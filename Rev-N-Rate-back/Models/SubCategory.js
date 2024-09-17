import { Model, DataTypes } from "sequelize";
import sequelize from '../config/database.js';
class SubCategory extends Model { }
SubCategory.init({
    subCategoryId: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    subCategoryName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subCategoryPic: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "SubCategory",
    tableName: "SubCategory",
    timestamps: false,
});
export default { SubCategory };