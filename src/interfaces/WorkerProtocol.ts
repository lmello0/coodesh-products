export interface WorkerProtocol {
  getLinks(): Promise<string[]>;
}
