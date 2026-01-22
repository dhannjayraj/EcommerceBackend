import { createClient } from 'redis';

export const redisClient = createClient({
  url: 'redis://127.0.0.1:6379',
});

redisClient.on('error', (err) => {
  console.log('Redis Error:', err.message);
});

export const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log('Redis connected');
    }
  } catch (err: any) {
    console.log('Redis not connected (app will run without cache)');
  }
};
