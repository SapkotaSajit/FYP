import db from '../../config/Database.js';
import Users from '../../models/User.js';

const countController = {};

// Function to count total number of users
countController.getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await Users.count();
    res.json({ totalUsers });
  } catch (error) {
    console.error('Error counting total users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to count total number of staff
countController.getTotalStaff = async (req, res) => {
  try {
    const totalStaff = await Users.count({ where: { role_id: 3 } });
    res.json({ totalStaff });
  } catch (error) {
    console.error('Error counting total staff:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default countController;
