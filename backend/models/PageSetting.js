import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const PageSetting = db.define(
  "page_settings",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    page_key: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    display_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  },
);

export default PageSetting;
