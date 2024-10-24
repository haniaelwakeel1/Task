import prisma from '../Prisma/client.js';
    // List all todos

export const getTodos = async (req, res) => {
    const todos = await prisma.todo.findMany({
      where: { userId: req.user.userId },
    });
    res.json(todos);
  };

// export const getTodos = async (req, res) => {
//   try {
//     const todos = await prisma.todo.findMany({
//       where: { userId: req.user.userId }, 
//     });
    
//     if (!todos || todos.length === 0) {
//       return res.status(404).json({ message: 'No todos found for this user' }); 
//     }

//     res.json(todos);
//   } catch (error) {
//     console.error('Error fetching todos:', error); 
//     res.status(500).json({ error: 'An error occurred while fetching todos' }); 
//   }
// };


  // Add a new todo
 export const addTodo = async (req, res) => {
    const { title } = req.body;
    const todo = await prisma.todo.create({
      data: {
        title,
        userId: req.user.userId
      },
    });
    res.status(201).json(todo);
  };
  
    // Update todo status
  export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
  const data = { status }
  const resolvedStatuses = ['COMPLETED', 'CANCELLED']
  if (resolvedStatuses.includes(status)) {
      data.resolvedAt = new Date()
  }
   const todo = await prisma.todo.update({
      where: { id },
      data,
    });
    res.json(todo);
  };
  