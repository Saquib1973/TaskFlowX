import { Request, Response, NextFunction } from 'express';
import { prisma } from '../app';
import { AppError } from '../middleware/error.middleware';

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        userId,
      },
    });

    res.status(201).json({
      status: 'success',
      data: {
        todo,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;

    const todos = await prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      status: 'success',
      results: todos.length,
      data: {
        todos,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const todo = await prisma.todo.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!todo) {
      return next(new AppError('No todo found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        todo,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, description, completed } = req.body;

    const todo = await prisma.todo.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!todo) {
      return next(new AppError('No todo found with that ID', 404));
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        title,
        description,
        completed,
      },
    });

    res.status(200).json({
      status: 'success',
      data: {
        todo: updatedTodo,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const todo = await prisma.todo.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!todo) {
      return next(new AppError('No todo found with that ID', 404));
    }

    await prisma.todo.delete({
      where: { id },
    });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};