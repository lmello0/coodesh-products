import { IConnectionStatus } from './IConnectionStatus';

export interface IStatus {
  uptime: string;
  memoryUsage: string;
  lastSync: Date | string;
  connections: IConnectionStatus;
}
