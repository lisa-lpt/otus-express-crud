import { Request } from 'express';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
}

export interface GetUsersFilters {
  page: number;
  limit: number;
  userId?: number;
  search?: string;
}

export interface GetUsersResult {
  data: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const usersValidator = {
  validateCreate: (body: unknown): body is CreateUserDto => {
    if (typeof body !== 'object' || body === null) {
      return false;
    }

    const data = body as Record<string, unknown>;

    return (
      typeof data.name === 'string' &&
      data.name.trim().length > 0 &&
      typeof data.email === 'string' &&
      data.email.includes('@')
    );
  },

  validateUpdate: (body: unknown): body is UpdateUserDto => {
    if (typeof body !== 'object' || body === null) {
      return false;
    }

    const data = body as Record<string, unknown>;

    if ('name' in data && typeof data.name !== 'string') {
      return false;
    }

    if ('email' in data && typeof data.email !== 'string') {
      return false;
    }

    return true;
  },

  validateFilters: (req: Request) => {
    const { page, limit } = req.query;

    const parsedPage = page ? Number(page) : 1;
    const parsedLimit = limit ? Number(limit) : 10;

    if (!Number.isInteger(parsedPage) || parsedPage < 1) {
      return false;
    }

    if (!Number.isInteger(parsedLimit) || parsedLimit < 1) {
      return false;
    }

    if (parsedLimit > 100) {
      return false;
    }

    return true;
  },
};
