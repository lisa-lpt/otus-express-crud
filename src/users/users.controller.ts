import { Request, Response } from 'express';
import { usersService } from './users.service.js';
import { usersValidator } from './users.dto.js';

export const usersController = {
  getAll: (req: Request, res: Response) => {
    res.json(usersService.getAll());
  },

  get: (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const user = usersService.get(id);

    if (!user) {
      res.status(404).json({
        message: 'User not found',
      });
      return;
    }

    res.json(user);
  },

  create: (req: Request, res: Response) => {
    if (!usersValidator.validateCreate(req.body)) {
      res.status(400).json({
        message: 'Invalid user data',
      });
      return;
    }

    const user = usersService.create(req.body);

    res.status(201).json(user);
  },

  update: (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!usersValidator.validateUpdate(req.body)) {
      res.status(400).json({
        message: 'Invalid user data',
      });
      return;
    }

    const user = usersService.update(id, req.body);

    if (!user) {
      res.status(404).json({
        message: 'User not found',
      });
      return;
    }

    res.json(user);
  },

  delete: (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const deleted = usersService.delete(id);

    if (!deleted) {
      res.status(404).json({
        message: 'User not found',
      });
      return;
    }

    res.status(204).send();
  },
};
