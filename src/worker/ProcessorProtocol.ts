export interface ProcessorProtocol {
  processJSON(filePath: string): Promise<number>;
}
