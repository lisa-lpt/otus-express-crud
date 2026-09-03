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

export interface UpdateUserDto {
  userId?: number;
  title?: string;
  description?: string;
}
