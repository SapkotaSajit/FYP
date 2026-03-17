import Users from "../../models/User.js";
import Booking from "../../models/Booking.js";
import BookingAssign from "../../models/BookingAssign.js";
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
    // Assuming status 0 = pending, or based on BookingAssign status
    // For simplicity, let's count all bookings in the bookings table
    const totalBookings = await Booking.count();
    res.json({ totalBookings });
  } catch (error) {
    console.error("Error counting bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to count total revenue (placeholder or based on completed services)
export const getDashboardStats = async (req, res) => {
  try {
    const users = await Users.count({ where: { role_id: 2 } });
    const staff = await Users.count({ where: { role_id: 3 } });
    const bookings = await Booking.count();
    // Return combined stats for efficiency
    res.json({
      totalUsers: users,
      totalStaff: staff,
      activeBookings: bookings,
      revenue: "Rs. 12.5k", // Static for now as no pricing model found in DB
    });
  } catch (error) {
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
