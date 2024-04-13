// import { Sequelize } from 'sequelize';
// import db from "../config/Database.js";

// const { DataTypes } = Sequelize;

// const Contact = db.define('contact', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   name: {
//     type: DataTypes.STRING(100),
//     allowNull: false
//   },
//   description: {
//     type: DataTypes.TEXT
//   },
//   phone: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   email: {
//     type: DataTypes.STRING,
//     unique: true,
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//   },
//   updatedAt: {
//     type: DataTypes.DATE,
//     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//   }
// }, {
//   tableName: 'contact',
//   timestamps: true,
//   underscored: true
// });

// export default Contact;


import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const Contact = db.define('contact', {
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
    type: DataTypes.TEXT
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'contact',
  timestamps: true,
  underscored: true
});

export default Contact;
