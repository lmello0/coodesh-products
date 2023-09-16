export interface ExtractorProtocol {
  extract(filesPath: string[]): Promise<undefined | string[]>;
}
