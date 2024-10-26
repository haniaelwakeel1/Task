

import Joi from 'joi';
import prisma from '../Prisma/client.js';

const Status = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
}

export const addTodo = async (req, res) => {
  try {
    const schema = Joi.object({
      title: Joi.string().required(),
    })
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { title } = req.body;
    const { userId } = req.user;

    const pendingTodo = await prisma.todo.findFirst({
      where: {
        title,  
        userId
      }
    });
    if (pendingTodo) return res.status(400).json({ message: 'Todo already exists' });
  
    const todo = await prisma.todo.create({
      data: {
        title,
        status: Status.PENDING,
        userId
      },
    });
  
    res.status(201).json(todo);
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 

export const getTodos = async (req, res) => {
  try {
    const { userId } = req.user;

    const todos = await prisma.todo.findMany({
      where: { userId }
    });

    res.json(todos);
  } catch (error) {
    console.error('Error getting todos:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
 
export const updateTodoStatus = async (req, res) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required(),
      status: Joi.string().valid(...Object.values(Status)).required()
    });
    const { error } = schema.validate({ ...req.params, ...req.body });
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { id } = req.params;
    const { status } = req.body;
    const { userId } = req.user;

    const todo = await prisma.todo.findFirst({
      where: {
        id: parseInt(id),
        userId,
        
      },
    });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    if (status === todo.status) return res.status(400).json({ message: 'Sent status is same as current status' });

    const data = { status };
    const resolvingStatuses = [Status.COMPLETED, Status.CANCELLED];
  
    const updatedTodo = await prisma.todo.update({
      where: { id: todo.id },
      data
    });

    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};