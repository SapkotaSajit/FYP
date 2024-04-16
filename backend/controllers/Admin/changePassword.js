
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../../models/User.js";


export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.id; 

  try {
    
    const user = await Users.findByPk(userId);

    
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Current password is incorrect" });
    }

    
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await user.update({ password: hashedPassword });

   
    res.json({ msg: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ msg: "Failed to change password" });
  }
};
