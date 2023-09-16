import { MongoRepository } from '../repositories/MongoRepository';
import { Downloader } from './Download';
import { Extractor } from './Extractor';
import { Processor } from './Processor';
import { Worker } from './Worker';

const donwloadLocation = process.env.DOWNLOAD_LOCATION || './';
const filesUrl = process.env.OPENFOODS_FILES_URL || '';
const downloadUrl = process.env.OPENFOODS_DOWNLOAD_URL || '';

const mongoRepository = new MongoRepository();

const downloader = new Downloader(filesUrl, downloadUrl);
const extractor = new Extractor();
const processor = new Processor(mongoRepository);

const worker = new Worker(
  donwloadLocation,
  downloader,
  extractor,
  processor,
  mongoRepository,
);

export { worker };
