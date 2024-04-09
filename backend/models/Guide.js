import Sequelize from 'sequelize';
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const Guide = db.define('guides', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    timestamps: false
});

export default Guide;
