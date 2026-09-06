import { tasksData } from './tasks.data.js';
import {
  CreateTaskDto,
  GetTasksFilters,
  GetTasksResult,
  Task,
  UpdateTaskDto,
} from './tasks.dto.js';

export const tasksService = {
  getAll: ({
    page,
    limit,
    userId,
    search,
  }: GetTasksFilters): GetTasksResult => {
    let filteredTasks = tasksData.tasks;

    if (userId) {
      filteredTasks = filteredTasks.filter((task) => task.userId === userId);
    }

    if (search) {
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search)
      );
    }

    const total = filteredTasks.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const totalPages = Math.ceil(total / limit);

    filteredTasks = filteredTasks.slice(start, end);

    return {
      data: filteredTasks,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  },

  get: (id: number): Task | undefined => {
    return tasksData.tasks.find((task) => task.id === id);
  },

  create: (data: CreateTaskDto): Task => {
    tasksData.lastId++;

    const newTask: Task = {
      id: tasksData.lastId,
      userId: data.userId,
      title: data.title,
      description: data.description,
    };

    tasksData.tasks.push(newTask);

    return newTask;
  },

  update: (id: number, data: UpdateTaskDto): Task | undefined => {
    const task = tasksData.tasks.find((task) => task.id === id);

    if (!task) {
      return undefined;
    }

    Object.assign(task, data);

    return task;
  },

  delete: (id: number): boolean => {
    const initialLength = tasksData.tasks.length;

    tasksData.tasks = tasksData.tasks.filter((task) => task.id !== id);

    return tasksData.tasks.length !== initialLength;
  },
};
