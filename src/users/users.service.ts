import { User, CreateUserDto, UpdateUserDto } from './users.dto.js';
import { usersData } from './users.data.js';

export const usersService = {
  getAll: (): User[] => usersData.users,

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
