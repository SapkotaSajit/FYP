import Users from "../../models/User.js";
import Booking from "../../models/Booking.js";
import BookingAssign from "../../models/BookingAssign.js";
import Service from "../../models/Service.js";
import Portfolio from "../../models/Portfolio.js";
import Contact from "../../models/Contact.js";
import { Op } from "sequelize";

// Function to count total number of users
export const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await Users.count({ where: { role_id: 2 } });
    res.json({ totalUsers });
  } catch (error) {
    console.error("Error counting total users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to count total number of staff
export const getTotalStaff = async (req, res) => {
  try {
    const totalStaff = await Users.count({ where: { role_id: 3 } });
    res.json({ totalStaff });
  } catch (error) {
    console.error("Error counting total staff:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to count total number of active bookings (pending/accepted)
export const getTotalBookingsCount = async (req, res) => {
  try {
    const totalBookings = await Booking.count();
    res.json({ totalBookings });
  } catch (error) {
    console.error("Error counting bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ... (previous functions remain if used elsewhere, but I'll focus on getDashboardStats)

// Function to calculate total dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await Users.count({ where: { role_id: 2 } });
    const totalStaff = await Users.count({ where: { role_id: 3 } });

    // Booking counts by status from BookingAssign
    const pending = await BookingAssign.count({ where: { status: "Pending" } });
    const accepted = await BookingAssign.count({ where: { status: "Accept" } });
    const rejected = await BookingAssign.count({ where: { status: "Reject" } });
    const completed = await BookingAssign.count({
      where: { status: "Completed" },
    });

    // Additional metrics
    const totalServices = await Service.count({
      where: { parent_id: { [Op.ne]: null } },
    }); // Only child services
    const totalPortfolios = await Portfolio.count();
    const totalContacts = await Contact.count();
    const recentContacts = await Contact.findAll({
      limit: 5,
      order: [["createdAt", "DESC"]],
    });

    res.json({
      totalUsers,
      totalStaff,
      activeBookings: pending + accepted,
      revenue: 0, // No price field in models yet
      breakdown: {
        pending,
        accepted,
        rejected,
        completed,
      },
      additional: {
        services: totalServices,
        portfolios: totalPortfolios,
        contacts: totalContacts,
      },
      recentContacts,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ error: "Stats retrieval failed" });
  }
};
// Function to get specific stats for logged-in staff
export const getStaffDashboardStats = async (req, res) => {
  try {
    const userId = req.id; // Corrected: use req.id from verifyToken

    const pending = await BookingAssign.count({
      where: { user_id: userId, status: "Pending" },
    });
    const accepted = await BookingAssign.count({
      where: { user_id: userId, status: "Accept" },
    });
    const rejected = await BookingAssign.count({
      where: { user_id: userId, status: "Reject" },
    });
    const completed = await BookingAssign.count({
      where: { user_id: userId, status: "Completed" },
    });

    res.json({
      pending,
      accepted,
      rejected,
      completed,
      totalAssigned: pending + accepted + rejected + completed,
    });
  } catch (error) {
    console.error("Error fetching staff stats:", error);
    res.status(500).json({ error: "Staff statistics retrieval failed" });
  }
};
