import {
  User,
  CreateUserDto,
  UpdateUserDto,
  GetUsersFilters,
  GetUsersResult,
} from './users.dto.js';
import { usersData } from './users.data.js';

export const usersService = {
  getAll: ({ page, limit, search }: GetUsersFilters): GetUsersResult => {
    let filteredUsers = usersData.users;

    if (search) {
      filteredUsers = filteredUsers.filter(
        (user) => user.name.includes(search) || user.email.includes(search)
      );
    }

    const total = filteredUsers.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const totalPages = Math.ceil(total / limit);

    filteredUsers = filteredUsers.slice(start, end);

    return {
      data: filteredUsers,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  },

  get: (id: number): User | undefined => {
    return usersData.users.find((user) => user.id === id);
  },

  create: (data: CreateUserDto): User => {
    usersData.lastId++;

    const newUser: User = {
      id: usersData.lastId,
      name: data.name,
      email: data.email,
    };

    usersData.users.push(newUser);

    return newUser;
  },

  update: (id: number, data: UpdateUserDto): User | undefined => {
    const user = usersData.users.find((user) => user.id === id);

    if (!user) {
      return undefined;
    }

    Object.assign(user, data);

    return user;
  },

  delete: (id: number): boolean => {
    const initialLength = usersData.users.length;

    usersData.users = usersData.users.filter((user) => user.id !== id);

    return usersData.users.length !== initialLength;
  },
};
