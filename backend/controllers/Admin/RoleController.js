import Role from "../../models/Role.js";

export const createRole = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newRole = await Role.create({
      name,
      description
    });
    res.status(201).json({ message: 'Role created successfully', role: newRole });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create role' });
  }
};

export const getRoles = async (req, res) => {
        try {
          const users = await Role.findAll({
            attributes: ["id", "name", "description"],
          });
          res.json(users);
        } catch (error) {
          console.log(error);
        }
      };

export const getRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.json({ role });
  } catch (error) {
    console.error('Error fetching role:', error);
    res.status(500).json({ message: 'Failed to fetch role' });
  }
};

export const updateRoleById = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    role.name = name;
    role.description = description;
    await role.save();
    res.json({ message: 'Role updated successfully', role });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update role' });
  }
};

export const deleteRoleById = async (req, res) => {
  const { id } = req.params;
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ message: 'Invalid role ID' });
  }

  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    await role.destroy();
    return res.json({ message: 'Role deleted successfully' });
  } catch (error) {
    console.error('Failed to delete role:', error);
    return res.status(500).json({ message: 'Failed to delete role' });
  }
};
