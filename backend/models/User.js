// import { Sequelize } from "sequelize";
// import db from "../config/Database.js";

// const { DataTypes } = Sequelize;

// const Users = db.define(
//   "users",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     name: {
//       type: DataTypes.STRING,
//     },
//     email: {
//       type: DataTypes.STRING,
//       unique: true,
//     },
//     phone: {
//       type: DataTypes.STRING,
//       allowNull: true
//     },
//     password: {
//       type: DataTypes.STRING,
//     },
//     refresh_token: {
//       type: DataTypes.TEXT,
//     },
//     role_id: {
//       type: DataTypes.INTEGER,
//       defaultValue: 2,
//     },
//   },
//   {
//     freezeTableName: true,
//   }
// );

// export default Users;



import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
    role_id: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
    },
    reset_code: {
      type: DataTypes.INTEGER, 
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Users;
