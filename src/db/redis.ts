import { createClient } from 'redis';

const redis = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
});

redis.on('error', (err) => {
  redis.quit();

  throw err;
});

export { redis };
