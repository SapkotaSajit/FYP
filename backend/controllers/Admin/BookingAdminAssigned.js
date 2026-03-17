import Booking from "../../models/Booking.js";
import BookingAssign from "../../models/BookingAssign.js";
import Service from "../../models/Service.js";
import Users from "../../models/User.js";

// Helper to format booking objects consistently for the Admin view
const formatAdminAssignment = (assign) => {
  const b = assign.booking || assign.Booking;
  const u = b ? b.user || b.User || b.users || b.Users : null;
  const s = b ? b.service || b.Service : null;
  // Included staff person
  const staff = assign.user || assign.User;

  return {
    id: assign.id,
    user_id: assign.user_id,
    status: assign.status,
    booking_id: assign.booking_id,
    staff: staff
      ? {
          id: staff.id,
          name: staff.name,
          phone: staff.phone,
        }
      : null,
    booking: b
      ? {
          id: b.id,
          booking_time: b.booking_time,
          booking_date: b.booking_date,
          user: u
            ? {
                id: u.id,
                name: u.name,
                phone: u.phone,
              }
            : { name: "Unknown Client", phone: "N/A" },
          service: s
            ? {
                id: s.id,
                name: s.name,
              }
            : { name: "Deleted Service" },
        }
      : null,
  };
};

export const getAllPendingBooking = async (req, res) => {
  try {
    const userPendingBookings = await BookingAssign.findAll({
      where: { status: "Pending" },
      include: [
        {
          model: Booking,
          include: [
            { model: Users, attributes: ["id", "name", "phone"] },
            { model: Service, attributes: ["id", "name"] },
          ],
        },
        { model: Users, attributes: ["id", "name", "phone"] }, // Include the assigned staff
      ],
    });
    res.status(200).json(userPendingBookings.map(formatAdminAssignment));
  } catch (error) {
    console.error("Error fetching admin pending bookings:", error);
    res.status(500).json({ message: "Internal error fetching pending tasks" });
  }
};

export const getAllCompletedBooking = async (req, res) => {
  try {
    const userCompletedBookings = await BookingAssign.findAll({
      where: { status: "Completed" },
      include: [
        {
          model: Booking,
          include: [
            { model: Users, attributes: ["id", "name", "phone"] },
            { model: Service, attributes: ["id", "name"] },
          ],
        },
        { model: Users, attributes: ["id", "name", "phone"] },
      ],
    });
    res.status(200).json(userCompletedBookings.map(formatAdminAssignment));
  } catch (error) {
    console.error("Error fetching completed bookings:", error);
    res
      .status(500)
      .json({ message: "Internal error fetching completed tasks" });
  }
};

export const getAllAcceptBooking = async (req, res) => {
  try {
    const userAcceptedBookings = await BookingAssign.findAll({
      where: { status: "Accept" },
      include: [
        {
          model: Booking,
          include: [
            { model: Users, attributes: ["id", "name", "phone"] },
            { model: Service, attributes: ["id", "name"] },
          ],
        },
        { model: Users, attributes: ["id", "name", "phone"] },
      ],
    });
    res.status(200).json(userAcceptedBookings.map(formatAdminAssignment));
  } catch (error) {
    console.error("Error fetching accepted bookings:", error);
    res.status(500).json({ message: "Internal error fetching accepted tasks" });
  }
};

export const getAllRejectBooking = async (req, res) => {
  try {
    const userRejectedBookings = await BookingAssign.findAll({
      where: { status: "Reject" },
      include: [
        {
          model: Booking,
          include: [
            { model: Users, attributes: ["id", "name", "phone"] },
            { model: Service, attributes: ["id", "name"] },
          ],
        },
        { model: Users, attributes: ["id", "name", "phone"] },
      ],
    });
    res.status(200).json(userRejectedBookings.map(formatAdminAssignment));
  } catch (error) {
    console.error("Error fetching rejected bookings:", error);
    res.status(500).json({ message: "Internal error fetching rejected tasks" });
  }
};
