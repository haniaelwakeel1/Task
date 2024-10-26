import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
    getTodos,
    addTodo,
    updateTodoStatus,
} from '../controllers/TodoController.js';

const router = express.Router();

router.get('/getTodos', authenticateToken, getTodos);

router.post('/addTodo', authenticateToken, addTodo);

router.put('/:id/status', authenticateToken, updateTodoStatus);

export default router;

