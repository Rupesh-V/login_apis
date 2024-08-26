// src/controllers/userController.js

const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../services/hashing.js');
const { pool } = require('../config/db');


// Function to generate JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const register = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
      const existingUser = await userModel.existingUser(email);
      
      if (existingUser.rowCount > 0) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      const hashedPassword = await hashPassword(password);
      const values = [name, email, hashedPassword];

      const result = await userModel.createUser(values);
  
      const newUser = result.rows[0];
      const token = generateToken(newUser);
      res.status(201).json({ token, user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
};

// Login user
const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const result = await userModel.existingUser(email);

      if (result.rowCount === 0) {
        return res.status(400).json({ error: 'Invalid Email' });
      }
  
      const user = result.rows[0];
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid Password' });
      }
  
      const token = generateToken(user);
      res.status(200).json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  };

const getUsers = async (req, res) => {
  try {
    const result = await userModel.getUsers();
    res.status(200).json({ status: true, data: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching users');
  }
};

// const getUsers = async (req, res) => {
//     const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Extract the token from the header
  
//     if (!token) {
//       return res.status(401).send('Token is missing');
//     }
  
//     try {
//       // Verify the token
//       jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] }, async (err, decoded) => {
//         if (err) {
//           return res.status(403).send('Invalid token');
//         }
  
//         // Token is valid, proceed with fetching users
//         try {
//           const result = await userModel.getUsers();
//           res.status(200).json({ status: true,message:"Token Validated", data: result.rows });
//         } catch (error) {
//           console.error(error);
//           res.status(500).send('Error fetching users');
//         }
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error validating token');
//     }
//   };

const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await userModel.getUserById(id);
    res.status(200).json({status:true,data:result.rows});
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching user by ID');
  }
};

const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, mobile } = req.body;
  const values = [name, email, mobile, id];
  try {
    await userModel.updateUser(values);
    res.status(200).send({status:true,message:`User modified with ID: ${id}`});
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating user');
  }
};

const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await userModel.deleteUser(id);
    res.status(200).send({status:true,message:`User deleted with ID: ${id}`});
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting user');
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  register, 
  login,
};
