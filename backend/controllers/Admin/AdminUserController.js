import Users from "../../models/User.js";
import bcrypt from "bcrypt";

export const CreateUser = async (req, res) => {
  const { name, email, password, confPassword, role_id,phone } = req.body;
  const roleId = role_id || 2;
  const existingUser = await Users.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: "Email is already registered" });
  }

  if (password !== confPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role_id: roleId,
    });
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const deleteUsersById = async (req, res) => {
  const { id } = req.params;
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ message: 'Invalid Users ID' });
  }

  try {
    const users = await Users.findByPk(id);
    if (!users) {
      return res.status(404).json({ message: 'Users not found' });
    }
    await users.destroy();
    return res.json({ message: 'Users deleted successfully' });
  } catch (error) {
    console.error('Failed to delete Users:', error);
    return res.status(500).json({ message: 'Failed to delete Users' });
  }
};