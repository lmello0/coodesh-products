import { MongoRepositoryProtocol } from '../repositories/MongoRepositoryProtocol';
import { ProcessorProtocol } from './ProcessorProtocol';
import fs from 'fs';
import readline from 'readline';

export class Processor implements ProcessorProtocol {
  constructor(private readonly db: MongoRepositoryProtocol) {}

  private async processLine(line: string): Promise<void> {
    if (line[line.length - 1] == '\r') {
      line = line.substring(0, line.length - 1);
    }

    if (line.length > 0) {
      const obj = JSON.parse(line);
      await this.db.insertProduct(obj);
    }
  }

  async processJSON(filePath: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const stream = fs.createReadStream(filePath, {
        flags: 'r',
        encoding: 'utf-8',
      });

      const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity,
      });

      let idx = 0;

      rl.on('line', async (line) => {
        if (idx === 100) {
          rl.close();
        }

        this.processLine(line);
        idx++;
      });

      rl.on('close', () => {
        resolve(idx);
      });

      rl.on('error', (err) => {
        reject(err);
      });
    });
  }
}
