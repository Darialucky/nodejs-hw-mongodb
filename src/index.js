import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { createDirIfNotexists } from './utils/createDirIfNotExists.js';

const bootstrap = async () => {
  try {
    await initMongoConnection();
    console.log('Application started successfully!');
    await createDirIfNotexists(TEMP_UPLOAD_DIR);
    await createDirIfNotexists(UPLOAD_DIR);
  } catch (error) {
    console.error('Error starting application', error);
  }
  setupServer();
};

bootstrap();
