import { Request, Response } from 'express';
import { tasksService } from './tasks.service.js';
import { tasksValidator } from './tasks.dto.js';

export const tasksController = {
  getAll: (req: Request, res: Response) => {
    if (!tasksValidator.validateFilters(req)) {
      res.status(400).json({
        message: 'Invalid request',
      });
      return;
    }

    const userId =
      typeof req.query.userId === 'string'
        ? Number(req.query.userId)
        : undefined;

    const page =
      typeof req.query.page === 'string' ? Number(req.query.page) : 1;
    const limit =
      typeof req.query.limit === 'string' ? Number(req.query.limit) : 10;

    const search =
      typeof req.query.search === 'string'
        ? req.query.search.trim()
        : undefined;

    res.json(tasksService.getAll({ page, limit, userId, search }));
  },

  get: (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const task = tasksService.get(id);

    if (!task) {
      res.status(404).json({
        message: 'Task not found',
      });
      return;
    }

    res.json(task);
  },

  create: (req: Request, res: Response) => {
    if (!tasksValidator.validateCreate(req.body)) {
      res.status(400).json({
        message: 'Invalid task data',
      });
      return;
    }

    const task = tasksService.create(req.body);

    res.status(201).json(task);
  },

  update: (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!tasksValidator.validateUpdate(req.body)) {
      res.status(400).json({
        message: 'Invalid task data',
      });
      return;
    }

    const task = tasksService.update(id, req.body);

    if (!task) {
      res.status(404).json({
        message: 'Task not found',
      });
      return;
    }

    res.json(task);
  },

  delete: (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const deleted = tasksService.delete(id);

    if (!deleted) {
      res.status(404).json({
        message: 'Task not found',
      });
      return;
    }

    res.status(204).send();
  },
};
