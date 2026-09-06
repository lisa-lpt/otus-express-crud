import { Router } from 'express';
import { tasksController } from './tasks.controller.js';

export const tasksRouter = Router();

// READ ALL
tasksRouter.get('/', tasksController.getAll);

// READ
tasksRouter.get('/:id', tasksController.get);

// CREATE
tasksRouter.post('/', tasksController.create);

// UPDATE
tasksRouter.patch('/:id', tasksController.update);

// DELETE
tasksRouter.delete('/:id', tasksController.delete);
