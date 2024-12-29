import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

export const userRegister = async (req, res) => {
  const { name, email, password, role } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return res.status(404).json({
      success: false,
      message: "User already exists..."
    });
  }
  const hashPassword = await bcrypt.hash(password, 10)

  user = await User.create({
    name,
    email,
    password: hashPassword,
    role: role || 'user'
  });

  const token = jwt.sign({ _id: user._id, role: user.role }, '!@#$%^&*()');
  res.status(201).cookie("token", token, {
    httpOnly: true,
    maxAge: 20 * 60 * 1000
  }).json({
    success: true,
    message: "User registered successfully",
    user
  });
}

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(404).json({ success: false, message: 'invalid credentials' })
    }
    const token = jwt.sign({ _id: user._id, role: user.role }, '!@#$%^&*()', { expiresIn: '1h' });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1 hour
    }).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export const userLogout = (req,res)=>{
  res.status(200).cookie("token", "",{
      expires: new Date(Date.now())
  }).json({
      success: true,
      message: "logout successfully"
  })
}

export const getMyProfile = (req, res) => {
  if (!req.user) {
      return res.status(404).json({
          success: false,
          message: "User not found"
      });
  }
  
  res.json({
      success: true,
      user: req.user
  });
};



// export const sendEmail = async(email, subject,text) => {
//   try{
//     const transporter = nodemailer.createTransport({
//       host: process.env.HOST
//     })
//   }
// }