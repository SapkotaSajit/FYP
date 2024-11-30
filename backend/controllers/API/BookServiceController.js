import jwt from "jsonwebtoken";
import Booking from "../../models/Booking.js";
import User from '../../models/User.js';
import Service from '../../models/Service.js';

export const getAllBookings = async (req, res) => {
  try {
    
    const bookings = await Booking.findAll({
      where: {
        status: 0 
      }
    });

    
    const bookingsWithDetails = await Promise.all(bookings.map(async (booking) => {
      const user = await User.findByPk(booking.user_id);
      const service = await Service.findByPk(booking.service_id);
      return {
        id: booking.id,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
        service: {
          id: service.id,
          name: service.name,
        },
        booking_time: booking.booking_time,
        booking_date: booking.booking_date,
        status: booking.status,
      };
    }));

    res.status(200).json(bookingsWithDetails);
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    res.status(500).json({ message: "Failed to fetch all bookings" });
  }
};

export const getAllProcessingBookings = async (req, res) => {
  try {
    
    const bookings = await Booking.findAll({
      where: {
        status: 1 
      }
    });

   
    const bookingsWithDetails = await Promise.all(bookings.map(async (booking) => {
      const user = await User.findByPk(booking.user_id);
      const service = await Service.findByPk(booking.service_id);
      return {
        id: booking.id,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
        service: {
          id: service.id,
          name: service.name,
        },
        booking_time: booking.booking_time,
        booking_date: booking.booking_date,
        status: booking.status,
      };
    }));

    res.status(200).json(bookingsWithDetails);
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    res.status(500).json({ message: "Failed to fetch all bookings" });
  }
};

export const bookService = async (req, res) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ message: "Authorization header is missing" });
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return res.status(401).json({ message: "Access token is missing" });
    }
    const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const { userId } = decodedToken;
    const { serviceId } = req.params;
    if (!serviceId) {
      return res.status(400).json({ message: "Service ID is missing in request parameters" });
    }
    const { booking_time, booking_date,status } = req.body;
    const booking = await Booking.create({
      user_id: userId,
      service_id:serviceId,
      booking_time: booking_time,
      booking_date: booking_date,
    });

    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    console.error("Error booking service:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid access token" });
    }
    res.status(500).json({ message: "Failed to book service" });
  }
};

export const deleteBookingById = async (req, res) => {
  const { id } = req.params;
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ message: 'Invalid Booking ID' });
  }

  try {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    await booking.destroy();
    return res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Failed to delete Booking:', error);
    return res.status(500).json({ message: 'Failed to delete Booking' });
  }
};