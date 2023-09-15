import 'dotenv/config';
import mongoose from 'mongoose';
import { app } from './app';
import { redis } from './db/redis';
import { connectionStatus } from './controllers/statusController';

const dbUser = process.env.MONGODB_USER || '';
const dbPassword = process.env.MONGODB_PASSWORD || '';

let dbURL = process.env.MONGODB_URL || '';

dbURL = dbURL.replace('<user>', dbUser);
dbURL = dbURL.replace('<password>', dbPassword);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  connectionStatus.apiStatus = 'Online';
  console.log(`API listening on http://localhost:${port}`);
});

redis.connect().then(() => {
  connectionStatus.redisStatus = 'Online';
  console.log('Connected to Redis');
});

mongoose.connect(dbURL).then(() => {
  connectionStatus.mongoStatus = 'Online';
  console.log('Connected to MongoDB');
});

redis.on('error', (err) => {
  console.error(err);
  connectionStatus.redisStatus = 'Offline';
});

mongoose.connection.on('error', (err) => {
  console.error(err);
  connectionStatus.mongoStatus = 'Offline';
});

process.on('SIGINT', async () => {
  console.warn('\nSIGINT received, shutting down the API...');

  await new Promise((resolve) => server.close(resolve));
  console.log('Server closed!');

  await redis.quit();
  console.log('Redis connection finished');

  await mongoose.connection.close();
  console.log('MongoDB connection finished');
});

export { connectionStatus };
