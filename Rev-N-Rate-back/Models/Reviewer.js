import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Review from './Review.js';
class Reviewer extends Model {}
Reviewer.init({
  reviewerId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profilePic: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  isBlocked: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isTrusted:{
    type:DataTypes.TINYINT,
    allowNull:true
  }
}, {
  sequelize,
  modelName: 'Reviewer',
  tableName: 'Reviewer', 
  timestamps: false
});
Reviewer.hasMany(Review, { foreignKey: 'reviewerId' });

export default Reviewer;
