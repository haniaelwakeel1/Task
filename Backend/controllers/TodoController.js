import prisma from '../Prisma/client.js';
    // List all todos

export const getTodos = async (req, res) => {
    const todos = await prisma.todo.findMany({
      where: { userId: req.user.userId },
    });
    res.json(todos);
  };

  // Add a new todo
export const addTodo = async (req, res) => {
  const { title } = req.body;
  const todo = await prisma.todo.create({
    data: {
      title,
      status: 'pending',
      userId: req.user.userId
    },
  });
  res.status(201).json(todo);
};  
// export const updateTodo = async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;
  
// const data = { status }
// const resolvedStatuses = ['COMPLETED', 'CANCELLED']
// if (resolvedStatuses.includes(status)) {
//     data.resolvedAt = new Date()
// }
//  const todo = await prisma.todo.update({
//     where: { id },
//     data,
//   });
//   res.json(todo);
// };


// export const updateTodo = async (todoId, newStatus) => {
//   // if (!token) return; // Ensure the user is authenticated

//   const response = await prisma.todo.update(
//     `http://localhost:5000/todo/${todoId}/status`, 
//     { status: newStatus }// This is the request body
   
//   );

//   return response.data; // Return the updated todo item
// };

// export const updateTodo = async (todoId, newStatus) => {
//   console.log('todoId:', todoId, 'newStatus:', newStatus); 
//   try {
//     const updatedTodo = await prisma.todo.update({
//       where: { id: todoId },          
//       data: { status: newStatus },     
//     });
//     return updatedTodo; 
//   } catch (error) {
//     console.error('Error updating todo:', error.message);
//     throw error; 
//   }
// };
export const updateTodo = async (todoId, newStatus) => {
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id: parseInt(todoId) },  
      data: { status: newStatus },      
    });
    
    return updatedTodo;  
  } catch (error) {
    console.error('Error updating todo:', error.message);
    throw error; 
  }
};