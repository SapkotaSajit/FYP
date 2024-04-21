

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
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    res.json({ message: 'Password updated successfully', user });
  } catch (error) {
    res.status(500).json({ message });
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

