import type { Request } from 'express';

export interface Task {
  id: number;
  userId: number;
  title: string;
  description: string;
}

export interface CreateTaskDto {
  userId: number;
  title: string;
  description: string;
}

export interface UpdateTaskDto {
  userId?: number;
  title?: string;
  description?: string;
}

export interface FilterTaskArgs {
  page: number;
  limit: number;
  userId?: number;
}

export interface GetTasksResult {
  data: Task[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const tasksValidator = {
  validateCreate: (body: unknown): body is CreateTaskDto => {
    if (typeof body !== 'object' || body === null) {
      return false;
    }

    const data = body as Record<string, unknown>;

    return (
      typeof data.title === 'string' &&
      data.title.trim().length > 0 &&
      typeof data.description === 'string' &&
      data.description.trim().length > 0 &&
      typeof data.userId === 'number'
    );
  },

  validateUpdate: (body: unknown): body is UpdateTaskDto => {
    if (typeof body !== 'object' || body === null) {
      return false;
    }

    const data = body as Record<string, unknown>;

    if ('title' in data && typeof data.title !== 'string') {
      return false;
    }

    if ('description' in data && typeof data.description !== 'string') {
      return false;
    }

    if ('userId' in data && typeof data.userId !== 'number') {
      return false;
    }

    return true;
  },

  validateTasksQuery: (req: Request) => {
    const { page, limit, userId } = req.query;

    const parsedPage = page ? Number(page) : 1;
    const parsedLimit = limit ? Number(limit) : 10;
    const parsedUserId = userId ? Number(userId) : undefined;

    if (!Number.isInteger(parsedPage) || parsedPage < 1) {
      return false;
    }

    if (!Number.isInteger(parsedLimit) || parsedLimit < 1) {
      return false;
    }

    if (parsedLimit > 100) {
      return false;
    }

    if (
      parsedUserId !== undefined &&
      (!Number.isInteger(parsedUserId) || parsedUserId < 1)
    ) {
      return false;
    }

    return true;
  },
};
