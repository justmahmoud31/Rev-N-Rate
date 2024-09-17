import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Product from './Product.js';
import Brand from "./Brand.js";

class Review extends Model {}

Review.init({
  reviewId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  reviewerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: () => import('./Reviewer.js').then(m => m.default), // Dynamic import
      key: 'reviewerId'
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Product,
      key: 'productId'
    }
  },
  brandId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Brand,
      key: 'brandId'
    }
  },
  comments: {
    type: DataTypes.STRING,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  dislikes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  photos: {
    type: DataTypes.BLOB('long'),
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  quality: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  service: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  isPinned: {
    type: DataTypes.TINYINT,
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'Review',
  tableName: 'Review',
  timestamps: false
});

(async () => {
  const { default: Reviewer } = await import('./Reviewer.js');
  Review.belongsTo(Reviewer, { foreignKey: 'reviewerId', as: 'reviewer' });
})();
Review.belongsTo(Brand, { foreignKey: 'brandId' });  
Brand.hasMany(Review, { foreignKey: 'brandId' });
export default Review;
