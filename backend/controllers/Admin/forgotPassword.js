
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import Users from "../../models/User.js";

// Generate a random 4-digit code
const generateRandomCode = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'sapkotasajit5@gmail.com',
    pass: 'exizvwsytjauboms'
  },
});

// Send email with the random code and store the code in the database
export const sendForgotPasswordEmail = async (email) => {
  try {
    // Find the user by email
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return { success: false, error: "Email not found" };
    }

    // Generate a random 4-digit code
    const resetCode = generateRandomCode();

    // Store the reset code in the database
    user.reset_code = resetCode;
    await user.save();

    // Send email with the reset code
    const mailOptions = {
      from: "sapkotasajit5@gmail.com",
      to: email,
      subject: "Password Reset Code",
      text: `Your password reset code is: ${resetCode}`,
      // text: `http://localhost:3000/reset-password`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Code sent to ${email}: ${resetCode}`);
    return { success: true, resetCode };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: "Failed to send email" };
  }
};
export const verifyResetCode = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await Users.findOne({ where: { reset_code: code } });
    if (user) {
      if(user.reset_code == code){
      return res.status(201).json({ success: true });
      }
    }else{
      return res.status(400).json({ success: false, error: "Invalid reset code" });
    }

  } catch (error) {
    console.error("Error verifying reset code:", error);
    return res.status(500).json({ success: false, error: "Failed to verify reset code" });
  }
};