import 'dotenv/config';
import { dbURL } from './db/mongo';
import mongoose from 'mongoose';
import { app } from './app';
import { redis } from './db/redis';
import { connectionStatus } from './controllers/statusController';
import { runScheduledTask } from './utils/runTask';
import { worker } from './worker';

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  connectionStatus.apiStatus = 'Online';
  console.log(`API listening on http://localhost:${port}`);
});

mongoose.connect(dbURL);

process.on('SIGINT', async () => {
  console.warn('\nSIGINT received, shutting down the API...');

  await new Promise((resolve) => server.close(resolve));
  console.log('Server closed!');

  await redis.quit();
  console.log('Redis connection finished');

  await mongoose.connection.close();
  console.log('MongoDB connection finished');
});

const syncInterval = process.env.SYNC_INTERVAL || '0 0 * * *';

runScheduledTask(syncInterval, async () => {
  console.log('Starting sync');
  await worker.sync();
  console.log('Sync finished');
});

export { connectionStatus };
