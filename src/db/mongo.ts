import mongoose from 'mongoose';

const dbUser = process.env.MONGODB_USER || '';
const dbPassword = process.env.MONGODB_PASSWORD || '';

let dbURL = process.env.MONGODB_URL || '';

dbURL = dbURL.replace('<user>', dbUser);
dbURL = dbURL.replace('<password>', dbPassword);

export async function run() {
  try {
    mongoose.connect(dbURL);

    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);

    throw err;
  }
}
