export interface WorkerProtocol {
  sync(): Promise<void>;
}
