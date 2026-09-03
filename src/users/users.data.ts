import { User } from './users.dto.js';

export const usersData: { users: User[]; lastId: number } = {
  users: [
    {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
    },
    {
      id: 2,
      name: 'Bob',
      email: 'bob@example.com',
    },
  ],
  lastId: 2,
};
