
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
    user: 'fabricvr411@gmail.com',
    pass: 'dzpailqdkiuhouty'
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
      from: "fabricvr411@gmail.com",
      to: email,
      subject: "Password Reset Code",
      text: `Your password reset code is: ${resetCode}`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Code sent to ${email}: ${resetCode}`);
    return { success: true, resetCode };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: "Failed to send email" };
  }
};


// export const verifyResetCode = async (email, enteredCode) => {
//   try {
//     // Find the user by email
//     const user = await Users.findOne({ where: { email } });
//     if (!user) {
//       return { success: false, error: "User not found" };
//     }

//     // Check if the reset code stored in the database matches the entered code
//     if (user.reset_code !== parseInt(enteredCode, 10)) {
//       return { success: false, error: "Incorrect reset code" };
//     }

//     // Clear the reset code for the user
//     user.reset_code = null;
//     await user.save();

//     navigate("/reset-password");
    
//     // Proceed with password reset - you can redirect to the reset password page or return success response

//     return { success: true };
//   } catch (error) {
//     console.error("Error verifying reset code:", error);
//     return { success: false, error: "Failed to verify reset code" };
//   }
// };


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