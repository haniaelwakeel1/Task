import dotenv from 'dotenv'; 
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js'; 

dotenv.config(); 

const app = express();

app.use(express.json()); 

app.use('/auth', authRoutes);

app.use('/todo', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
