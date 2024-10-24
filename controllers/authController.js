import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({});

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const registerUser = async (req, res) => {
    const { email, password } = req.body;
     console.log("Email received for registration:", email);
    console.log("Password received for registration:", password);   
    try {
      const existingUser = await prisma.user.findUnique({
        where: {
           email: email,
         },
    });
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

      // hash password before database insertion
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: { 
          email, // email,
          password: hashedPassword },
      });
      res.status(201).json(newUser);

    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: 'Registration failed' });    }
  };

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
    
    return res.status(200).json({ message: 'Login successful', user });

  } catch (error) {
    console.error('Login error:', error); 
    return res.status(500).json({ error: 'Internal server error' });
  }
};

  // Generate token
  // const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  // res.json.status(201).json({ token });
  // expect(res.body).toHaveProperty('token');

