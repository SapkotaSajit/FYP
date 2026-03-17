import jwt from "jsonwebtoken";
import Booking from "../../models/Booking.js";
import User from "../../models/User.js";
import Service from "../../models/Service.js";

// Helper to format booking objects for frontend consistency
const formatBooking = (booking) => {
  // Try to find the associated user/service in various possible Sequelize property names
  const u = booking.user || booking.User || booking.users || booking.Users;
  const s = booking.service || booking.Service;

  return {
    id: booking.id,
    user: u
      ? {
          id: u.id,
          name: u.name,
          email: u.email,
          phone: u.phone,
        }
      : { id: 0, name: "Anonymous Client", email: "N/A", phone: "N/A" },
    service: s
      ? {
          id: s.id,
          name: s.name,
        }
      : { id: 0, name: "Service Deleted" },
    booking_time: booking.booking_time,
    booking_date: booking.booking_date,
    status: booking.status,
  };
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { status: 0 },
      include: [
        { model: User, attributes: ["id", "name", "email", "phone"] },
        { model: Service, attributes: ["id", "name"] },
      ],
    });
    res.status(200).json(bookings.map(formatBooking));
  } catch (error) {
    console.error("Error fetching unassigned bookings:", error);
    res
      .status(500)
      .json({ message: "Internal synchronization error fetching bookings" });
  }
};

export const getAllProcessingBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { status: 1 },
      include: [
        { model: User, attributes: ["id", "name", "email", "phone"] },
        { model: Service, attributes: ["id", "name"] },
      ],
    });
    res.status(200).json(bookings.map(formatBooking));
  } catch (error) {
    console.error("Error fetching processing bookings:", error);
    res
      .status(500)
      .json({
        message: "Internal synchronization error fetching processing bookings",
      });
  }
};

export const bookService = async (req, res) => {
  try {
    const userId = req.id;
    const { serviceId } = req.params;

    if (!serviceId) {
      return res
        .status(400)
        .json({ message: "No service identifier provided" });
    }

    const { booking_time, booking_date } = req.body;

    if (!booking_time || !booking_date) {
      return res
        .status(400)
        .json({ message: "Please provide both date and time" });
    }

    const booking = await Booking.create({
      user_id: userId,
      service_id: serviceId,
      booking_time,
      booking_date,
    });

    res
      .status(201)
      .json({ message: "Request initialized successfully", booking });
  } catch (error) {
    console.error("Critical booking failure:", error);
    res
      .status(500)
      .json({ message: "Operational failure during booking initialization" });
  }
};

export const deleteBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: "Record not found" });
    }
    await booking.destroy();
    return res.json({ message: "Record purged successfully" });
  } catch (error) {
    console.error("Purge failure:", error);
    return res.status(500).json({ message: "Failed to purge booking record" });
  }
};
