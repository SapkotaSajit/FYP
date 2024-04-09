import { DataTypes, Sequelize } from 'sequelize';
import db from '../config/Database.js';
import GuideTypes from './GuideTypes.js';

const GuideSteps = db.define('guide_steps', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  guideTypes_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: GuideTypes,
      key: 'id'
    }
  },
  guideSteps_image: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  timestamps: false,
});

GuideSteps.belongsTo(GuideTypes, {
  foreignKey: 'guideTypes_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

export default GuideSteps;
