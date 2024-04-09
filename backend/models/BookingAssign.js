import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import User from './User.js';
import Booking from './Booking.js';

const BookingAssign = db.define('booking_assigns', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.BIGINT(20),
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Accept', 'Reject', 'Completed'),
    defaultValue: 'Pending',
  },
  
  booking_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Booking,
      key: 'id'
    }
  }
}, {
  timestamps: false
});

BookingAssign.belongsTo(User, { foreignKey: 'user_id' });
BookingAssign.belongsTo(Booking, { foreignKey: 'booking_id' });

export default BookingAssign;
