import express from 'express';
import { registerUser, loginUser, getUsers, updateUser, deleteUser } from '../controllers/user.controller.js';

const router = express.Router();

// POST register new user
router.post('/signup', registerUser);

// POST login user
router.post('/signin', loginUser);

// GET all users
router.get('/', getUsers);

// PUT update user role
router.put('/:id', updateUser);

// DELETE user
router.delete('/:id', deleteUser);

export default router;
