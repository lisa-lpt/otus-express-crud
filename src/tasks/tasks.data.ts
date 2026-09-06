import { Task } from './tasks.dto.js';

export const tasksData: { tasks: Task[]; lastId: number } = {
  tasks: [
    {
      id: 1,
      userId: 2,
      title: 'task 1',
      description: 'important task 1',
    },
    {
      id: 2,
      userId: 1,
      title: 'task 2',
      description: 'important task 2',
    },
    {
      id: 3,
      userId: 2,
      title: 'task 3',
      description: 'important task 3',
    },
  ],
  lastId: 3,
};
