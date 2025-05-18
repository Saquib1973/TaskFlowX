import express from 'express';
import {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todo.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

// Protect all routes
router.use(protect);

router.route('/')
  .get(getTodos)
  .post(createTodo);

router.route('/:id')
  .get(getTodo)
  .patch(updateTodo)
  .delete(deleteTodo);

export default router;