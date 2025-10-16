import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {config} from '../utils/config.js';
import result from '../utils/result.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// 🔹 Registration
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
    
    const encryptedPassword = await bcrypt.hash(password, 10);
    // 1️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.send(result.createErrorResult('Email already registered'));

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
      phoneNumber: phone,
    });

    await newUser.save();
    console.log('User registered:', newUser.email);
    res.send(result.createSuccessResult('User registered successfully'));
  } catch (error) {
    res.send(result.createErrorResult(" failed to register " +error.message));
  }
});

// 🔹 Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.send(result.createErrorResult('Invalid email or password'));

    // 2️⃣ Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.send(result.createErrorResult('Invalid email or password'));

    // 3️⃣ Create JWT token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, config.secret);

    // 4️⃣ On Login : Send back response to frontend with token and user info 
    const body = {
      token     : token,
      firstName : `${user.firstName}`,
      lastName  : `${user.lastName}`,
      email     : `${user.email}`,
      phone     : `${user.phoneNumber}`
    };

    res.send(result.createSuccessResult(body));
  } catch (error) {
    res.send(result.createErrorResult(" failed to login " +error.message));
  }
});



//----------------------------------------------------------------------------------------------
// 🔹 Profile (GET)
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('firstName lastName phoneNumber email');
    res.send(result.createSuccessResult(user));
  } catch (error) {
    res.send(result.createErrorResult(error.message));
  }
});

// 🔹 Profile (UPDATE)
router.put('/profile', async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { firstName, lastName, phoneNumber: phone },
      { new: true }
    ).select('firstName lastName phoneNumber email');

    res.send(result.createSuccessResult(user));
  } catch (error) {
    res.send(result.createErrorResult(error.message));
  }
});

export default router;
