import { Response, Request, NextFunction } from 'express';

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(
    `[${new Date().toISOString().slice(11, 19)}] ${req.method} ${req.url}`
  );
  next();
};
