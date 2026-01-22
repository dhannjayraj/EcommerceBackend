import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response';

export const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(statusCode).json(errorResponse(message));
};
