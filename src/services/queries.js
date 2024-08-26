// src/services/queries.js
const existingUserQuery = 'SELECT * FROM users WHERE email = $1';
const getAllUsersQuery = 'SELECT * FROM users ORDER BY id ASC';
const getUserByIdQuery = 'SELECT * FROM users WHERE id = $1';
const createUserQuery = `
INSERT INTO users (name, email, password, created_at, updated_at) 
VALUES ($1, $2, $3, current_timestamp, current_timestamp) 
RETURNING id, name, email;
`;
const updateUserQuery = `
  UPDATE users 
  SET name = $1, email = $2, mobile = $3
  WHERE id = $4;
`;
const deleteUserQuery = 'DELETE FROM users WHERE id = $1';

module.exports = {
  existingUserQuery,
  getAllUsersQuery,
  getUserByIdQuery,
  createUserQuery,
  updateUserQuery,
  deleteUserQuery,
};
