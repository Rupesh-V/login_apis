// src/models/userModel.js

const { Pool } = require('pg');
const queries = require('../services/queries');
const { pool } = require('../config/db');

const existingUser= (email)=>pool.query(queries.existingUserQuery,[email])
const getUsers = () => pool.query(queries.getAllUsersQuery);
const createUser = (values) => pool.query(queries.createUserQuery, values);

const getUserById = (id) => pool.query(queries.getUserByIdQuery, [id]);
const updateUser = (values) => pool.query(queries.updateUserQuery, values);
const deleteUser = (id) => pool.query(queries.deleteUserQuery, [id]);

module.exports = {
  existingUser,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
