import Booking from "../../models/Booking.js";
import BookingAssign from "../../models/BookingAssign.js";
import Service from "../../models/Service.js";
import Users from "../../models/User.js";

// Helper to format assignment objects consistently for the frontend
const formatAssignment = (assign) => {
  const b = assign.booking || assign.Booking;
  const u = b ? b.user || b.User || b.users || b.Users : null;
  const s = b ? b.service || b.Service : null;

  return {
    id: assign.id,
    user_id: assign.user_id,
    status: assign.status,
    booking_id: assign.booking_id,
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

export const createBookingAssign = async (req, res) => {
  const { userId } = req.body;
  const { bookingId } = req.params;

  try {
    const bookingAssign = await BookingAssign.create({
      user_id: userId,
      status: "Pending",
      booking_id: bookingId,
    });
    await Booking.update(
      { status: true },
      {
        where: { id: bookingId },
      },
    );

    res.status(201).json({
      message: "Booking assignment created successfully",
      bookingAssign,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating booking assignment",
      error: error.message,
    });
  }
};

export const getAllBookingAssignments = async (req, res) => {
  try {
    const bookingAssignments = await BookingAssign.findAll({
      include: [
        {
          model: Booking,
          include: [
            { model: Users, attributes: ["id", "name", "phone"] },
            { model: Service, attributes: ["id", "name"] },
          ],
        },
      ],
    });
    res.status(200).json(bookingAssignments.map(formatAssignment));
  } catch (error) {
    res.status(500).json({
      message: "Error fetching booking assignments",
      error: error.message,
    });
  }
};

// Staff-specific listing functions
export const getAllUserBookingAssignments = async (req, res) => {
  try {
    const userId = req.params.userId;
    const assignments = await BookingAssign.findAll({
      where: { user_id: userId, status: "Pending" },
      include: [
        {
          model: Booking,
          include: [
            { model: Users, attributes: ["id", "name", "phone"] },
            { model: Service, attributes: ["id", "name"] },
          ],
        },
      ],
    });
    res.status(200).json(assignments.map(formatAssignment));
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user assignments",
      error: error.message,
    });
  }
};

export const getAllUserBookingCompleteAssignments = async (req, res) => {
  try {
    const userId = req.params.userId;
    const assignments = await BookingAssign.findAll({
      where: { user_id: userId, status: "Completed" },
      include: [
        {
          model: Booking,
          include: [
            { model: Users, attributes: ["id", "name", "phone"] },
            { model: Service, attributes: ["id", "name"] },
          ],
        },
      ],
    });
    res.status(200).json(assignments.map(formatAssignment));
  } catch (error) {
    res.status(500).json({
      message: "Error fetching completed tasks",
      error: error.message,
    });
  }
};

export const getAllUserBookingAcceptAssignments = async (req, res) => {
  try {
    const userId = req.params.userId;
    const assignments = await BookingAssign.findAll({
      where: { user_id: userId, status: "Accept" },
      include: [
        {
          model: Booking,
          include: [
            { model: Users, attributes: ["id", "name", "phone"] },
            { model: Service, attributes: ["id", "name"] },
          ],
        },
      ],
    });
    res.status(200).json(assignments.map(formatAssignment));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching accepted tasks", error: error.message });
  }
};

export const getAllUserBookingRejectAssignments = async (req, res) => {
  try {
    const userId = req.params.userId;
    const assignments = await BookingAssign.findAll({
      where: { user_id: userId, status: "Reject" },
      include: [
        {
          model: Booking,
          include: [
            { model: Users, attributes: ["id", "name", "phone"] },
            { model: Service, attributes: ["id", "name"] },
          ],
        },
      ],
    });
    res.status(200).json(assignments.map(formatAssignment));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching rejected tasks", error: error.message });
  }
};

export const getBookingAssignById = async (req, res) => {
  const { id } = req.params;
  try {
    const bookingAssign = await BookingAssign.findByPk(id);
    if (!bookingAssign) {
      return res.status(404).json({ message: "Booking assignment not found" });
    }
    res.status(200).json(bookingAssign);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching booking assignment",
      error: error.message,
    });
  }
};

export const updateBookingAssignStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const bookingAssign = await BookingAssign.findByPk(id);
    if (!bookingAssign) {
      return res.status(404).json({ message: "Booking assignment not found" });
    }

    bookingAssign.status = status;
    await bookingAssign.save();

    return res.status(200).json({
      message: "Booking assignment status updated successfully",
      bookingAssign,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating booking assignment status",
      error: error.message,
    });
  }
};

export const updateBookingAssignById = async (req, res) => {
  const { id } = req.params;
  const { user_id, status, booking_id } = req.body;
  try {
    const bookingAssign = await BookingAssign.findByPk(id);
    if (!bookingAssign) {
      return res.status(404).json({ message: "Booking assignment not found" });
    }
    await bookingAssign.update({ user_id, status, booking_id });
    res.status(200).json({
      message: "Booking assignment updated successfully",
      bookingAssign,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating booking assignment",
      error: error.message,
    });
  }
};

export const deleteBookingAssignById = async (req, res) => {
  const { id } = req.params;
  try {
    const bookingAssign = await BookingAssign.findByPk(id);
    if (!bookingAssign) {
      return res.status(404).json({ message: "Booking assignment not found" });
    }
    await bookingAssign.destroy();
    res
      .status(200)
      .json({ message: "Booking assignment deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting booking assignment",
      error: error.message,
    });
  }
};
