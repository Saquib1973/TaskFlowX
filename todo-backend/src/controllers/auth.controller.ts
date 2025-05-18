import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../app';
import { AppError } from '../middleware/error.middleware';

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return next(new AppError('Email already in use', 400));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // Generate token
    const token = signToken(user.id);

    // Remove password from output
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: userWithoutPassword,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return next(new AppError('Incorrect email or password', 401));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(new AppError('Incorrect email or password', 401));
    }

    // Generate token
    const token = signToken(user.id);

    // Remove password from output
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: userWithoutPassword,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    next(error);
  }
};