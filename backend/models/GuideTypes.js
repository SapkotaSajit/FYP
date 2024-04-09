import { Sequelize, DataTypes } from 'sequelize';
import db from "../config/Database.js";
import Guide from "./Guide.js";

const GuideTypes = db.define('guide_types', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  guideTypes_image: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  guide_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  timestamps: false,
});

GuideTypes.belongsTo(Guide, {
  foreignKey: 'guide_id',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
});

export default GuideTypes;
