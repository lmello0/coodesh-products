import zlib from 'zlib';
import fs from 'fs';
import { ExtractorProtocol } from './ExtractorProtocol';

export class Extractor implements ExtractorProtocol {
  async extract(filesPath: string[]): Promise<undefined | string[]> {
    const promises = filesPath.map(async (filePath) => {
      const outputPath = filePath.replace('json.gz', 'json');

      const readStream = fs.createReadStream(filePath);
      const writeStream = fs.createWriteStream(outputPath);
      const unzipStream = zlib.createGunzip();

      readStream.pipe(unzipStream).pipe(writeStream);

      return new Promise((resolve, reject) => {
        unzipStream.on('error', (err) => {
          console.error('Error decompressing the file: ', err);
          reject(err);
        });

        writeStream.on('finish', () => {
          fs.unlinkSync(filePath);
          resolve(outputPath);
        });
      });
    });

    try {
      const result = (await Promise.all(promises)) as unknown as string[];

      console.log('All files decompressed successfully');

      return result;
    } catch (err) {
      if (err instanceof Error) throw new Error(err.message);
    }
  }
}
