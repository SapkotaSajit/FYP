import Users from '../../models/User.js';

// Function to count total number of users
export const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await Users.count({ where: { role_id: 2 } });
    res.json({ totalUsers });
  } catch (error) {
    console.error('Error counting total users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to count total number of staff
export const getTotalStaff = async (req, res) => {
  try {
    const totalStaff = await Users.count({ where: { role_id: 3 } });
    res.json({ totalStaff });
  } catch (error) {
    console.error('Error counting total staff:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
