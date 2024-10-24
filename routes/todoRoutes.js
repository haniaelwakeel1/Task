import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
    getTodos,
    addTodo,
    updateTodo,
} from '../controllers/TodoController.js';

const router = express.Router();

router.get('/', authenticateToken, getTodos);

router.post('/', authenticateToken, addTodo);

router.put('/:id/status', authenticateToken, updateTodo);

export default router;
