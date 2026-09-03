import { Router } from 'express';
import { usersController } from './users.controller.js';

export const usersRouter = Router();

// READ ALL
usersRouter.get('/', usersController.getAll);

// READ
usersRouter.get('/:id', usersController.get);

// CREATE
usersRouter.post('/', usersController.create);

// UPDATE
usersRouter.patch('/:id', usersController.update);

// DELETE
usersRouter.delete('/:id', usersController.delete);
