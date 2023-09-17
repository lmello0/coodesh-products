import { createClient } from 'redis';
import { connectionStatus } from '../services/GetStatusService';

const redis = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
});

redis.connect().then(() => {
  connectionStatus.redisStatus = 'Online';
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error(err);
  connectionStatus.redisStatus = 'Offline';
});

export { redis };
