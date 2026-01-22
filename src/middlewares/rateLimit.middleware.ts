import { Request, Response, NextFunction } from 'express';
import { redisClient } from '../config/redis';

export const rateLimit = (limit = 10, windowSec = 60) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ip = req.ip || 'unknown';
      const key = `rate:${ip}`;

      const current = await redisClient.incr(key);

      if (current === 1) {
        // first request -> set expiry
        await redisClient.expire(key, windowSec);
      }

      if (current > limit) {
        return res.status(429).json({
          error: 'Too many requests. Please try again later.',
        });
      }

      next();
    } catch (err) {
      next();
    }
  };
};
