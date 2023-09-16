import { History } from '../models/History';
import { MongoRepositoryProtocol } from '../repositories/MongoRepositoryProtocol';
import { unixNow } from '../utils/unixNow';
import { DownloadProtocol } from './DownloadProtocol';
import { ExtractorProtocol } from './ExtractorProtocol';
import { ProcessorProtocol } from './ProcessorProtocol';
import path from 'path';

export class Worker {
  constructor(
    private readonly downloadLocation: string,
    private readonly downloader: DownloadProtocol,
    private readonly extractor: ExtractorProtocol,
    private readonly processor: ProcessorProtocol,
    private readonly db: MongoRepositoryProtocol,
  ) {}

  async sync(): Promise<void> {
    const history = new History();

    const downloads = await this.downloader.downloadFiles(
      this.downloadLocation,
    );

    const files = await this.extractor.extract(downloads);

    if (files) {
      for (const file of files) {
        const productsImported = await this.processor.processJSON(file);

        history.files.push(path.basename(file));
        history.productsImported += productsImported;
      }
    }

    history.dateEnd = unixNow();

    await history.save();
  }
}
