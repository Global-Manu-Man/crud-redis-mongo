import express from 'express';
import { createUser, getUser, updateUser, deleteUser } from '../controllers/userController.js';
import { validateUser } from '../middleware/validation.js';

const router = express.Router();

router.post('/', validateUser, createUser);
router.get('/:id', getUser);
router.put('/:id', validateUser, updateUser);
router.delete('/:id', deleteUser);

export default router;