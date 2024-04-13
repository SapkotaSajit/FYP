import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import Users from "../../models/User.js";

let resetCode = ""; // Variable to store the generated code

// Generate a random 4-digit code
const generateRandomCode = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'fabricvr411@gmail.com',
    pass: 'dzpailqdkiuhouty'
  },
});

// Send email with the random code and store the code in the variable
export const sendForgotPasswordEmail = async (email) => {
  const resetCode = generateRandomCode(); // Generate a random 4-digit code
  const mailOptions = {
    from: "fabricvr411@gmail.com",
    to: email,
    subject: "Password Reset Code",
    text: `Your password reset code is: ${resetCode}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Code sent to ${email}: ${resetCode}`);
    return { success: true, resetCode };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: "Failed to send email" };
  }
};


export const verifyResetCode = async (email, enteredCode, newPassword) => {
  try {
    // Find the user by email and reset code
    const user = await Users.findOne({ where: { email: email, reset_code: enteredCode } });
    if (!user) {
      return { success: false, error: "Invalid reset code" };
    }

    // Check if the entered code matches the stored code
    if (user.reset_code !== enteredCode) {
      return { success: false, error: "Incorrect reset code" };
    }

    // Generate a hash of the new password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password and reset_code in the database
    await Users.update({ password: hashPassword, reset_code: null }, { where: { email: email } });

    return { success: true };
  } catch (error) {
    console.error("Error resetting password:", error);
    return { success: false, error: "Failed to reset password" };
  }
};
