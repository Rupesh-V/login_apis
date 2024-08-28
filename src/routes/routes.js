// src/routes/routes.js

const express = require('express');
const userController = require('../controllers/userController');
const authenticateJWT = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/users',authenticateJWT,userController.getUsers);
router.get('/users/:id', userController.getUserById);

router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
