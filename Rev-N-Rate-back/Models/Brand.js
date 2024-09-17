import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Category from './Category.js';
import bcrypt from "bcryptjs";
import Review from './Review.js';

class Brand extends Model {}

Brand.init({
    brandId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'categoryId'
        },
        allowNull: false
    },
    brandName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    brandEmail: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    brandPassword: {
        type: DataTypes.STRING,
        allowNull: true
    },
    websiteLink: {
        type: DataTypes.STRING,
        allowNull: true
    },
    photos: {
        type: DataTypes.STRING,
        allowNull: true
    },
    active: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    subscription: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    detail: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rate:{
        type:DataTypes.INTEGER,
        defaultValue:0
    }
}, {
    sequelize,
    modelName: 'Brand',
    tableName: 'Brand',
    timestamps: false,
    hooks: {
        beforeCreate: async (brand) => {
            if (brand.brandPassword) {
                const salt = await bcrypt.genSalt(10);
                brand.brandPassword = await bcrypt.hash(brand.brandPassword, salt);
            }
        }
    }
});

export default Brand;
