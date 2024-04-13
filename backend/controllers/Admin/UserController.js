// import  Users  from "../../models/User.js";
// import  Role  from "../../models/Role.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// export const getUsers = async (req, res) => {
//   try {
//     const users = await Users.findAll({ where: { role_id: 2 } });
//     const usersWithRole = await Promise.all(users.map(async user => {
//       const role = await Role.findByPk(user.role_id);
//       return {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role_id: user.role_id,
//         phone: user.phone,
//         role_name: role ? role.name : null
//       };
//     }));
//     res.json(usersWithRole);
//   } catch (error) {
//     console.error('Error fetching Users:', error);
//     res.status(500).json({ message: 'Failed to fetch Users' });
//   }
// };

// export const getUsersRole = async (req, res) => {
//   try {
//     const users = await Users.findAll({ where: { role_id: 3 } });
//     const usersWithRole = await Promise.all(users.map(async user => {
//       const role = await Role.findByPk(user.role_id);
//       return {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role_id: user.role_id,
//         phone: user.phone,
//         role_name: role ? role.name : null
//       };
//     }));
//     res.json(usersWithRole);
//   } catch (error) {
//     console.error('Error fetching Users:', error);
//     res.status(500).json({ message: 'Failed to fetch Users' });
//   }
// };


// export const Register = async (req, res) => {
//   const { name, email, password, confPassword ,phone } = req.body;
//   if (password !== confPassword)
//     return res
//       .status(400)
//       .json({ msg: "Password and Confirm Password do not match" });

//   // Check if the email address is already registered
//   const existingUser = await Users.findOne({ where: { email: email } });
//   if (existingUser) {
//     return res
//       .status(400)
//       .json({ msg: "Email address is already in used" });
//   }

//   const salt = await bcrypt.genSalt();
//   const hashPassword = await bcrypt.hash(password, salt);
//   try {
//     await Users.create({
//       name: name,
//       email: email,
//       phone: phone,
//       password: hashPassword,
//     });
//     res.json({ msg: "Register successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: "Failed to register user" });
//   }
// };


// export const Login = async (req, res) => {
//   try {
//     const user = await Users.findAll({
//       where: {
//         email: req.body.email,
//       },
//     });
//     const match = await bcrypt.compare(req.body.password, user[0].password);
//     if (!match) return res.status(400).json({ msg: "Wrong Password" });
//     const userId = user[0].id;
//     const name = user[0].name;
//     const email = user[0].email;
//     const roleId = user[0].role_id;
//     const accessToken = jwt.sign(
//       { userId, name, email , roleId },
//       process.env.ACCESS_TOKEN_SECRET,
//       {
//         expiresIn: "1d",
//       }
//     );
//     const refreshToken = jwt.sign(
//       { userId, name, email,roleId },
//       process.env.REFRESH_TOKEN_SECRET,
//       {
//         expiresIn: "1d",
//       }
//     );
//     await Users.update(
//       { refresh_token: refreshToken },
//       {
//         where: {
//           id: userId,
//         },
//       }
//     );
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 1000,
//     });
//     res.cookie("userId", userId, { maxAge: 24 * 60 * 60 * 1000 });
//     res.json({ accessToken ,roleId ,userId});
//   } catch (error) {
//     res.status(404).json({ msg: "Email not found" });
//   }
// };

// export const Logout = async (req, res) => {
//   const refreshToken = req.cookies.refreshToken;
//   if (!refreshToken) return res.sendStatus(204);
//   const user = await Users.findAll({
//     where: {
//       refresh_token: refreshToken,
//     },
//   });
//   if (!user[0]) return res.sendStatus(204);
//   const userId = user[0].id;
//   await Users.update(
//     { refresh_token: null },
//     {
//       where: {
//         id: userId,
//       },
//     }
//   );
//   res.clearCookie("refreshToken");
//   return res.sendStatus(200);
// };




import  Users  from "../../models/User.js";
import  Role  from "../../models/Role.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendForgotPasswordEmail, verifyResetCode } from "./forgotPassword.js";


export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const result = await sendForgotPasswordEmail(email);
    if (result.success) {
      res.json({ msg: "Email sent with password reset code" });
    } else {
      res.status(500).json({ msg: result.error });
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ msg: "Failed to send password reset code" });
  }
};

export const resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;

  try {
    const result = await verifyResetCode(email, code, newPassword);
    if (result.success) {
      res.json({ msg: "Password reset successfully" });
    } else {
      res.status(400).json({ msg: result.error });
    }
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ msg: "Failed to reset password" });
  }
};


export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({ where: { role_id: 2 } });
    const usersWithRole = await Promise.all(users.map(async user => {
      const role = await Role.findByPk(user.role_id);
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role_id: user.role_id,
        phone: user.phone,
        role_name: role ? role.name : null
      };
    }));
    res.json(usersWithRole);
  } catch (error) {
    console.error('Error fetching Users:', error);
    res.status(500).json({ message: 'Failed to fetch Users' });
  }
};

export const getUsersRole = async (req, res) => {
  try {
    const users = await Users.findAll({ where: { role_id: 3 } });
    const usersWithRole = await Promise.all(users.map(async user => {
      const role = await Role.findByPk(user.role_id);
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role_id: user.role_id,
        phone: user.phone,
        role_name: role ? role.name : null
      };
    }));
    res.json(usersWithRole);
  } catch (error) {
    console.error('Error fetching Users:', error);
    res.status(500).json({ message: 'Failed to fetch Users' });
  }
};


export const Register = async (req, res) => {
  const { name, email, password, confPassword ,phone } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password and Confirm Password do not match" });

  // Check if the email address is already registered
  const existingUser = await Users.findOne({ where: { email: email } });
  if (existingUser) {
    return res
      .status(400)
      .json({ msg: "Email address is already in used" });
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      name: name,
      email: email,
      phone: phone,
      password: hashPassword,
    });
    res.json({ msg: "Register successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Failed to register user" });
  }
};


export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const roleId = user[0].role_id;
    const accessToken = jwt.sign(
      { userId, name, email , roleId },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = jwt.sign(
      { userId, name, email,roleId },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie("userId", userId, { maxAge: 24 * 60 * 60 * 1000 });
    res.json({ accessToken ,roleId ,userId});
  } catch (error) {
    res.status(404).json({ msg: "Email not found" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};







////! try change password 

// controllers/userController.js

// import Users from "../../models/User.js";
// import Role from "../../models/Role.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// export const getUsers = async (req, res) => {
//   try {
//     const users = await Users.findAll({ where: { role_id: 2 } });
//     const usersWithRole = await Promise.all(users.map(async user => {
//       const role = await Role.findByPk(user.role_id);
//       return {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role_id: user.role_id,
//         phone: user.phone,
//         role_name: role ? role.name : null
//       };
//     }));
//     res.json(usersWithRole);
//   } catch (error) {
//     console.error('Error fetching Users:', error);
//     res.status(500).json({ message: 'Failed to fetch Users' });
//   }
// };

// export const getUsersRole = async (req, res) => {
//   try {
//     const users = await Users.findAll({ where: { role_id: 3 } });
//     const usersWithRole = await Promise.all(users.map(async user => {
//       const role = await Role.findByPk(user.role_id);
//       return {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role_id: user.role_id,
//         phone: user.phone,
//         role_name: role ? role.name : null
//       };
//     }));
//     res.json(usersWithRole);
//   } catch (error) {
//     console.error('Error fetching Users:', error);
//     res.status(500).json({ message: 'Failed to fetch Users' });
//   }
// };

// export const Register = async (req, res) => {
//   const { name, email, password, confPassword, phone } = req.body;
//   if (password !== confPassword)
//     return res
//       .status(400)
//       .json({ msg: "Password and Confirm Password do not match" });

//   const existingUser = await Users.findOne({ where: { email: email } });
//   if (existingUser) {
//     return res
//       .status(400)
//       .json({ msg: "Email address is already in use" });
//   }

//   const salt = await bcrypt.genSalt();
//   const hashPassword = await bcrypt.hash(password, salt);
//   try {
//     await Users.create({
//       name: name,
//       email: email,
//       phone: phone,
//       password: hashPassword,
//     });
//     res.json({ msg: "Register successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: "Failed to register user" });
//   }
// };

// export const Login = async (req, res) => {
//   try {
//     const user = await Users.findAll({
//       where: {
//         email: req.body.email,
//       },
//     });
//     const match = await bcrypt.compare(req.body.password, user[0].password);
//     if (!match) return res.status(400).json({ msg: "Wrong Password" });
//     const userId = user[0].id;
//     const name = user[0].name;
//     const email = user[0].email;
//     const roleId = user[0].role_id;
//     const accessToken = jwt.sign(
//       { userId, name, email, roleId },
//       process.env.ACCESS_TOKEN_SECRET,
//       {
//         expiresIn: "1d",
//       }
//     );
//     const refreshToken = jwt.sign(
//       { userId, name, email, roleId },
//       process.env.REFRESH_TOKEN_SECRET,
//       {
//         expiresIn: "1d",
//       }
//     );
//     await Users.update(
//       { refresh_token: refreshToken },
//       {
//         where: {
//           id: userId,
//         },
//       }
//     );
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 1000,
//     });
//     res.cookie("userId", userId, { maxAge: 24 * 60 * 60 * 1000 });
//     res.json({ accessToken, roleId, userId });
//   } catch (error) {
//     res.status(404).json({ msg: "Email not found" });
//   }
// };

// export const Logout = async (req, res) => {
//   const refreshToken = req.cookies.refreshToken;
//   if (!refreshToken) return res.sendStatus(204);
//   const user = await Users.findAll({
//     where: {
//       refresh_token: refreshToken,
//     },
//   });
//   if (!user[0]) return res.sendStatus(204);
//   const userId = user[0].id;
//   await Users.update(
//     { refresh_token: null },
//     {
//       where: {
//         id: userId,
//       },
//     }
//   );
//   res.clearCookie("refreshToken");
//   return res.sendStatus(200);
// };


// export const changePassword = async (req, res) => {
//   const { userId, oldPassword, newPassword } = req.body;

//   try {
//     const user = await Users.findByPk(userId);
//     if (!user) {
//       return res.status(404).json({ msg: "User not found" });
//     }

//     const match = await bcrypt.compare(oldPassword, user.password);
//     if (!match) {
//       return res.status(400).json({ msg: "Old password is incorrect" });
//     }

//     const salt = await bcrypt.genSalt();
//     const hashPassword = await bcrypt.hash(newPassword, salt);

//     await Users.update(
//       { password: hashPassword },
//       { where: { id: userId } }
//     );

//     res.json({ msg: "Password changed successfully" });
//   } catch (error) {
//     console.error('Error changing password:', error);
//     res.status(500).json({ msg: "Failed to change password" });
//   }
// };






////! try to do forgot password

// import Users from "../../models/User.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";





// // Function to send password reset email
// const sendPasswordResetEmail = async (email, resetToken) => {
//   try {
//     // Create Nodemailer transporter
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'fabricvr411@gmail.com',
//         pass: 'dzpailqdkiuhouty'
//       }
//     });

//     // Define email content
//     const mailOptions = {
//       from: "fabricvr411@gmail.com",
//       to: email,
//       subject: "Password Reset Request",
//       html: `<p>You have requested to reset your password. Please click the following link to reset your password:</p>
//             <a href="http://your-website.com/reset-password/${resetToken}">Reset Password</a>
//             <p>If you did not request this, please ignore this email.</p>`,
//     };

//     // Send email
//     await transporter.sendMail(mailOptions);
//     console.log("Password reset email sent successfully");
//   } catch (error) {
//     console.error("Error sending password reset email:", error);
//     throw new Error("Failed to send password reset email");
//   }
// };

// export const getUsers = async (req, res) => {
//   try {
//     const users = await Users.findAll({ where: { role_id: 2 } });
//     const usersWithRole = await Promise.all(users.map(async user => {
//       const role = await Role.findByPk(user.role_id);
//       return {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role_id: user.role_id,
//         phone: user.phone,
//         role_name: role ? role.name : null
//       };
//     }));
//     res.json(usersWithRole);
//   } catch (error) {
//     console.error('Error fetching Users:', error);
//     res.status(500).json({ message: 'Failed to fetch Users' });
//   }
// };

// export const getUsersRole = async (req, res) => {
//   try {
//     const users = await Users.findAll({ where: { role_id: 3 } });
//     const usersWithRole = await Promise.all(users.map(async user => {
//       const role = await Role.findByPk(user.role_id);
//       return {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role_id: user.role_id,
//         phone: user.phone,
//         role_name: role ? role.name : null
//       };
//     }));
//     res.json(usersWithRole);
//   } catch (error) {
//     console.error('Error fetching Users:', error);
//     res.status(500).json({ message: 'Failed to fetch Users' });
//   }
// };

// export const ForgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     // Check if the email address exists
//     const user = await Users.findOne({ where: { email } });
//     if (!user) {
//       return res.status(404).json({ msg: "Email not found" });
//     }

//     // Generate a new password reset token
//     const resetToken = jwt.sign(
//       { email },
//       process.env.RESET_TOKEN_SECRET,
//       { expiresIn: "1h" }
//     );

//     // Update the user record with the reset token
//     await Users.update(
//       { reset_token: resetToken },
//       { where: { email } }
//     );

//     // Send the password reset email containing the token
//     await sendPasswordResetEmail(email, resetToken);

//     res.json({ msg: "Password reset token has been sent to your email" });
//   } catch (error) {
//     console.error("Error sending password reset token:", error);
//     res.status(500).json({ msg: "Failed to send password reset token" });
//   }
// };

// export const ResetPassword = async (req, res) => {
//   try {
//     const { resetToken, newPassword } = req.body;
//     // Verify the reset token
//     const decoded = jwt.verify(resetToken, process.env.RESET_TOKEN_SECRET);
//     const email = decoded.email;

//     // Hash the new password
//     const salt = await bcrypt.genSalt();
//     const hashPassword = await bcrypt.hash(newPassword, salt);

//     // Update the user's password and clear the reset token
//     await Users.update(
//       { password: hashPassword, reset_token: null },
//       { where: { email } }
//     );

//     res.json({ msg: "Password reset successfully" });
//   } catch (error) {
//     console.error("Error resetting password:", error);
//     res.status(400).json({ msg: "Invalid or expired reset token" });
//   }
// };

// export const Register = async (req, res) => {
//   const { name, email, password, confPassword ,phone } = req.body;
//   if (password !== confPassword)
//     return res
//       .status(400)
//       .json({ msg: "Password and Confirm Password do not match" });

//   // Check if the email address is already registered
//   const existingUser = await Users.findOne({ where: { email: email } });
//   if (existingUser) {
//     return res
//       .status(400)
//       .json({ msg: "Email address is already in used" });
//   }

//   const salt = await bcrypt.genSalt();
//   const hashPassword = await bcrypt.hash(password, salt);
//   try {
//     await Users.create({
//       name: name,
//       email: email,
//       phone: phone,
//       password: hashPassword,
//     });
//     res.json({ msg: "Register successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: "Failed to register user" });
//   }
// };

// export const Login = async (req, res) => {
//   try {
//     const user = await Users.findAll({
//       where: {
//         email: req.body.email,
//       },
//     });
//     const match = await bcrypt.compare(req.body.password, user[0].password);
//     if (!match) return res.status(400).json({ msg: "Wrong Password" });
//     const userId = user[0].id;
//     const name = user[0].name;
//     const email = user[0].email;
//     const roleId = user[0].role_id;
//     const accessToken = jwt.sign(
//       { userId, name, email , roleId },
//       process.env.ACCESS_TOKEN_SECRET,
//       {
//         expiresIn: "1d",
//       }
//     );
//     const refreshToken = jwt.sign(
//       { userId, name, email,roleId },
//       process.env.REFRESH_TOKEN_SECRET,
//       {
//         expiresIn: "1d",
//       }
//     );
//     await Users.update(
//       { refresh_token: refreshToken },
//       {
//         where: {
//           id: userId,
//         },
//       }
//     );
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 1000,
//     });
//     res.cookie("userId", userId, { maxAge: 24 * 60 * 60 * 1000 });
//     res.json({ accessToken ,roleId ,userId});
//   } catch (error) {
//     res.status(404).json({ msg: "Email not found" });
//   }
// };

// export const Logout = async (req, res) => {
//   const refreshToken = req.cookies.refreshToken;
//   if (!refreshToken) return res.sendStatus(204);
//   const user = await Users.findAll({
//     where: {
//       refresh_token: refreshToken,
//     },
//   });
//   if (!user[0]) return res.sendStatus(204);
//   const userId = user[0].id;
//   await Users.update(
//     { refresh_token: null },
//     {
//       where: {
//         id: userId,
//       },
//     }
//   );
//   res.clearCookie("refreshToken");
//   return res.sendStatus(200);
// };






































////! Email verification gardai xu.......

// import Users from "../../models/User.js";
// import Role from "../../models/Role.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";
// import { config as dotenvConfig } from 'dotenv';


// dotenvConfig();

// export const sendEmail = async (email, link) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'fabricvr411@gmail.com',
//         pass: 'dzpailqdkiuhouty'
//       }
//     });

//     const mailOptions = {
//       from: 'fabricvr411@gmail.com',
//       to: email,
//       subject: 'Email Verification',
//       text: 'Verify Your Email',
//       html:
//         `<p>Please click on the following link, or paste this into your browser to complete the process:</p>
//               <p><a href="${link}">Verify Email</a></p>`
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//     });
//   } catch (error) {
//     console.log("Error sending email:", error);
//   }
// };

// export const getUsers = async (req, res) => {
//   try {
//     const users = await Users.findAll({ where: { role_id: 2 } });
//     const usersWithRole = await Promise.all(users.map(async user => {
//       const role = await Role.findByPk(user.role_id);
//       return {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role_id: user.role_id,
//         role_name: role ? role.name : null
//       };
//     }));
//     res.json(usersWithRole);
//   } catch (error) {
//     console.error('Error fetching Users:', error);
//     res.status(500).json({ message: 'Failed to fetch Users' });
//   }
// };

// export const getUsersRole = async (req, res) => {
//   try {
//     const users = await Users.findAll({ where: { role_id: 3 } });
//     const usersWithRole = await Promise.all(users.map(async user => {
//       const role = await Role.findByPk(user.role_id);
//       return {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role_id: user.role_id,
//         role_name: role ? role.name : null
//       };
//     }));
//     res.json(usersWithRole);
//   } catch (error) {
//     console.error('Error fetching Users:', error);
//     res.status(500).json({ message: 'Failed to fetch Users' });
//   }
// };

// export const Register = async (req, res) => {
//   const { name, email, password, confPassword } = req.body;
//   if (password !== confPassword)
//     return res
//       .status(400)
//       .json({ msg: "Password and Confirm Password do not match" });

//   try {
//     // Check if the email address is already registered
//     const existingUser = await Users.findOne({ where: { email: email } });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ msg: "Email address is already in use" });
//     }

//     const salt = await bcrypt.genSalt();
//     const hashPassword = await bcrypt.hash(password, salt);

//     const newUser = await Users.create({
//       name: name,
//       email: email,
//       password: hashPassword,
//       is_verified: false // Set is_verified to false initially
//     });

//     // Generate a verification token
//     const verificationToken = jwt.sign({ email }, process.env.VERIFICATION_TOKEN_SECRET, { expiresIn: '1d' });

//     // Construct the verification link
//     const verificationLink = `${process.env.BASE_URL}/verify-email?token=${verificationToken}`;

//     // Send the verification email
//     await sendEmail(email, verificationLink);

//     res.json({ msg: "Verification email sent. Please verify your email address to complete registration" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: "Failed to register user" });
//   }
// };

// export const VerifyEmail = async (req, res) => {
//   const token = req.query.token;
//   if (!token) {
//     return res.status(400).json({ msg: 'Token not provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.VERIFICATION_TOKEN_SECRET);
//     const email = decoded.email;

//     // Update user's is_verified field in the database
//     await Users.update({ is_verified: true }, { where: { email: email } });

//     res.redirect('/login'); // Redirect to login page after successful verification
//   } catch (error) {
//     console.error('Error verifying token:', error);
//     res.status(500).json({ msg: 'Failed to verify email' });
//   }
// };


// export const Login = async (req, res) => {
//   try {
//     const user = await Users.findOne({
//       where: {
//         email: req.body.email,
//       },
//     });

//     if (!user) {
//       return res.status(404).json({ msg: "Email not found" });
//     }

//     const match = await bcrypt.compare(req.body.password, user.password);
//     if (!match) {
//       return res.status(400).json({ msg: "Wrong Password" });
//     }

//     if (!user.is_verified) {
//       return res.status(403).json({ msg: "Email not verified" });
//     }

//     const userId = user.id;
//     const name = user.name;
//     const email = user.email;
//     const roleId = user.role_id;
//     const accessToken = jwt.sign(
//       { userId, name, email, roleId },
//       process.env.ACCESS_TOKEN_SECRET,
//       {
//         expiresIn: "1d",
//       }
//     );
//     const refreshToken = jwt.sign(
//       { userId, name, email, roleId },
//       process.env.REFRESH_TOKEN_SECRET,
//       {
//         expiresIn: "1d",
//       }
//     );
//     await Users.update(
//       { refresh_token: refreshToken },
//       {
//         where: {
//           id: userId,
//         },
//       }
//     );
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 1000,
//     });
//     res.cookie("userId", userId, { maxAge: 24 * 60 * 60 * 1000 });
//     res.json({ accessToken, roleId, userId });
//   } catch (error) {
//     console.error("Error logging in:", error);
//     res.status(500).json({ msg: "Internal server error" });
//   }
// };

// export const Logout = async (req, res) => {
//   const refreshToken = req.cookies.refreshToken;
//   if (!refreshToken) return res.sendStatus(204);
//   const user = await Users.findAll({
//     where: {
//       refresh_token: refreshToken,
//     },
//   });
//   if (!user[0]) return res.sendStatus(204);
//   const userId = user[0].id;
//   await Users.update(
//     { refresh_token: null },
//     {
//       where: {
//         id: userId,
//       },
//     }
//   );
//   res.clearCookie("refreshToken");
//   return res.sendStatus(200);
// };



////! aarko try 


// import Users from "../../models/User.js";
// import Role from "../../models/Role.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";

// // Create a Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'fabricvr411@gmail.com',
//     pass: 'dzpailqdkiuhouty'
//   }
// });

// export const getUsers = async (req, res) => {
//   try {
//     const users = await Users.findAll({ where: { role_id: 2 } });
//     const usersWithRole = await Promise.all(users.map(async user => {
//       const role = await Role.findByPk(user.role_id);
//       return {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role_id: user.role_id,
//         role_name: role ? role.name : null
//       };
//     }));
//     res.json(usersWithRole);
//   } catch (error) {
//     console.error('Error fetching Users:', error);
//     res.status(500).json({ message: 'Failed to fetch Users' });
//   }
// };

// export const getUsersRole = async (req, res) => {
//   try {
//     const users = await Users.findAll({ where: { role_id: 3 } });
//     const usersWithRole = await Promise.all(users.map(async user => {
//       const role = await Role.findByPk(user.role_id);
//       return {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role_id: user.role_id,
//         role_name: role ? role.name : null
//       };
//     }));
//     res.json(usersWithRole);
//   } catch (error) {
//     console.error('Error fetching Users:', error);
//     res.status(500).json({ message: 'Failed to fetch Users' });
//   }
// };

// export const Register = async (req, res) => {
//   const { name, email, password, confPassword } = req.body;
//   if (password !== confPassword)
//     return res
//       .status(400)
//       .json({ msg: "Password and Confirm Password do not match" });

//   // Check if the email address is already registered
//   const existingUser = await Users.findOne({ where: { email: email } });
//   if (existingUser) {
//     return res
//       .status(400)
//       .json({ msg: "Email address is already in use" });
//   }

//   const salt = await bcrypt.genSalt();
//   const hashPassword = await bcrypt.hash(password, salt);
//   try {
//     // Generate a random verification token
//     const verificationToken = jwt.sign({ email }, process.env.VERIFICATION_TOKEN_SECRET, {
//       expiresIn: '1d'
//     });

//     await Users.create({
//       name: name,
//       email: email,
//       password: hashPassword,
//       verification_token: verificationToken,
//       is_verified: false // Set is_verified to false initially
//     });

//     // Send the verification email
//     const verificationLink = `http://your-app-url/verify/${verificationToken}`;
//     const mailOptions = {
//       from: 'fabricvr411@gmail.com',
//       to: email,
//       subject: 'Email Verification',
//       text: `Please click on the following link to verify your email: ${verificationLink}`
//     };
//     await transporter.sendMail(mailOptions);

//     res.json({ msg: "Register successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: "Failed to register user" });
//   }
// };

// export const Login = async (req, res) => {
//   try {
//     const user = await Users.findAll({
//       where: {
//         email: req.body.email,
//       },
//     });

//     // Check if user exists
//     if (!user[0]) {
//       return res.status(404).json({ msg: "Email not found" });
//     }

//     // Check if user is verified
//     if (!user[0].is_verified) {
//       return res.status(400).json({ msg: "Email is not verified" });
//     }

//     const match = await bcrypt.compare(req.body.password, user[0].password);
//     if (!match) return res.status(400).json({ msg: "Wrong Password" });
    
//     const userId = user[0].id;
//     const name = user[0].name;
//     const email = user[0].email;
//     const roleId = user[0].role_id;
//     const accessToken = jwt.sign(
//       { userId, name, email , roleId },
//       process.env.ACCESS_TOKEN_SECRET,
//       {
//         expiresIn: "1d",
//       }
//     );
//     const refreshToken = jwt.sign(
//       { userId, name, email, roleId },
//       process.env.REFRESH_TOKEN_SECRET,
//       {
//         expiresIn: "1d",
//       }
//     );
//     await Users.update(
//       { refresh_token: refreshToken },
//       {
//         where: {
//           id: userId,
//         },
//       }
//     );
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 1000,
//     });
//     res.cookie("userId", userId, { maxAge: 24 * 60 * 60 * 1000 });
//     res.json({ accessToken ,roleId ,userId});
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: "Failed to login" });
//   }
// };


// export const Logout = async (req, res) => {
//   const refreshToken = req.cookies.refreshToken;
//   if (!refreshToken) return res.sendStatus(204);
//   const user = await Users.findAll({
//     where: {
//       refresh_token: refreshToken,
//     },
//   });
//   if (!user[0]) return res.sendStatus(204);
//   const userId = user[0].id;
//   await Users.update(
//     { refresh_token: null },
//     {
//       where: {
//         id: userId,
//       },
//     }
//   );
//   res.clearCookie("refreshToken");
//   return res.sendStatus(200);
// };
