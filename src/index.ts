import app from './app';
import { AppDataSource } from './data-source';
import { ENV } from './config/env';
import { connectRedis } from './config/redis';


async function startServer() {
  try {
    // Connect PostgreSQL (TypeORM)
    await AppDataSource.initialize();
    console.log('Database connected');

    // Connect Redis
    await connectRedis();
    console.log('Redis connected');

    // Start Express server
    app.listen(ENV.PORT, () => {
      console.log(`Server running on http://localhost:${ENV.PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();
