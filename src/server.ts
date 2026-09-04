import express from 'express';
import { loggerMiddleware } from './logger.js';

import { usersRouter } from './users/users.router.js';
import { tasksRouter } from './tasks/tasks.router.js';

const app = express();

app.use(express.json());

app.use(loggerMiddleware);

app.use('/users', usersRouter);

app.use('/tasks', tasksRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
