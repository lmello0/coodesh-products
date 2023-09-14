import 'dotenv/config';
import mongoose from 'mongoose';
import { run } from './db/mongo';
import { app } from './app';
import { Server } from 'http';

async function exit(server?: Server) {
  try {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
      console.log('Server closed!');
    }

    await mongoose.connection.close();
    console.log('Connection with MongoDB, finished');

    console.log('All connections cleared');
  } catch (err) {
    console.error(err);

    process.exit(1);
  } finally {
    console.log('Bye!');

    process.exit(0);
  }
}

run()
  .then(async () => {
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
      console.log(`Server online on localhost:${port}`);
    });

    process.on('SIGINT', async () => {
      console.warn('SIGINT received, shutting down the server...');

      await exit(server);
      console.log('Application finished');

      process.exit();
    });
  })
  .catch(async (err) => {
    console.error(err);

    await exit();
  });
