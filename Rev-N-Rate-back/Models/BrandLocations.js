import { DataTypes, Model } from "sequelize";
import sequelize from '../config/database.js';
import Brand from "./Brand.js";
class BrandLocations extends Model{}
BrandLocations.init({
    brandLocationId :{
        type:DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement:true
    },
    brandId :{
        type:DataTypes.INTEGER,
        references:{
            model:Brand,
            key:"brandId"
        },
        allowNull: false
    },
    country:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    city:{
        type:DataTypes.STRING,
        allowNull:false
    },
    street:{
        type:DataTypes.STRING,
        allowNull:true
    },
    workingDays:{
        type:DataTypes.STRING,
        allowNull:false
    },
    startHour:{
        type:DataTypes.DATE,
        allowNull:false
    },
    endHour:{
        type:DataTypes.DATE,
        allowNull:false
    }
},{
    sequelize,
    modelName: 'BrandLocations',
    tableName: 'BrandLocations',
    timestamps: false,
})
export default BrandLocations;