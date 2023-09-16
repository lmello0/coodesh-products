export interface DownloadProtocol {
  downloadFiles(dir: string): Promise<string[]>;
}
