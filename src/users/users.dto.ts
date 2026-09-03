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
};
