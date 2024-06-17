import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const bootstrap = async () => {
  try {
    await initMongoConnection();
    console.log('Application started successfully!');
  } catch (error) {
    console.error('Error starting application', error);
  }
  setupServer();
};

bootstrap();

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};
