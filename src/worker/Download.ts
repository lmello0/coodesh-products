import axios from 'axios';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { DownloadProtocol } from './DownloadProtocol';

export class Downloader implements DownloadProtocol {
  constructor(
    private readonly filesUrl: string,
    private readonly downloadUrl: string,
  ) {}

  private createDir(dir: string): void {
    fs.mkdirSync(dir, { recursive: true });
  }

  async getLinks(url: string, downloadUrl: string): Promise<string[]> {
    const rawLinks: string = (await axios.get(url)).data;

    const links = rawLinks
      .split('\n')
      .filter((link) => {
        return link !== '';
      })
      .map((link) => {
        return downloadUrl.replace('{filename}', link);
      });

    return links;
  }

  writeFile(url: string, dir: string): Promise<string> {
    const filename = path.basename(url);
    const filepath = path.join(path.join(dir, filename));
    const fileStream = fs.createWriteStream(filepath);

    return new Promise((resolve, reject) => {
      https
        .get(url, (response) => {
          if (response.statusCode === 200) {
            response.pipe(fileStream);

            fileStream.on('finish', () => {
              console.log(`File ${filename} downloaded`);
              fileStream.close();

              resolve(filepath);
            });
          } else {
            const error = `Failed to download file. Status code: ${response.statusCode}`;
            reject(error);
          }
        })
        .on('error', (err) => {
          const error = `Error downloading file: ${err.message}`;
          reject(error);
        });
    });
  }

  async downloadFiles(dir: string): Promise<string[]> {
    this.createDir(dir);

    const links = await this.getLinks(this.filesUrl, this.downloadUrl);

    const filepaths: string[] = [];
    for (const link of links) {
      const filepath = await this.writeFile(link, dir);

      filepaths.push(filepath);
    }

    return filepaths;
  }
}
