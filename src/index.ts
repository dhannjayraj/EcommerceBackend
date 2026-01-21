import app from './app';
import { AppDataSource } from './data-source';
import { ENV } from './config/env';

async function startServer() {
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connected');

    app.listen(ENV.PORT, () => {
      console.log(`🚀 Server running on port ${ENV.PORT}`);
    });
  } catch (error) {
    console.error('❌ Error starting server', error);
    throw new Error("CRASH TEST");
  }
}

startServer();
