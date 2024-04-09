import Sequelize from 'sequelize';
import db from "../config/Database.js";
import Users from './User.js';
import Service from './Service.js';

const { DataTypes } = Sequelize;

const Booking = db.define('bookings', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.BIGINT(20),
        allowNull: false
    },
    service_id: {
        type: DataTypes.BIGINT(20),
        allowNull: false
    },
    booking_time: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    booking_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
    }
}, {
    timestamps: false
    
});

Booking.belongsTo(Users, { foreignKey: 'user_id' });
Booking.belongsTo(Service, { foreignKey: 'service_id' });

export default Booking;
