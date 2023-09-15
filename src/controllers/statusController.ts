import os from 'os';
import { Request, Response } from 'express';
import { IConnectionStatus } from '../interfaces/IConnectionStatus';
import { IStatus } from '../interfaces/IStatus';

const connectionStatus: IConnectionStatus = {
  apiStatus: 'Offline',
  redisStatus: 'Offline',
  mongoStatus: 'Offline',
};

export class StatusController {
  async getStatus(req: Request, res: Response) {
    const totalRam = os.totalmem();
    const memoryUsage = process.memoryUsage().rss;

    const memoryUsedPercent = (memoryUsage / totalRam).toFixed(2);
    const memoryUsageInMb = (memoryUsage / 1024 / 1024).toFixed(0);

    const status: IStatus = {
      uptime: `${process.uptime().toFixed(2)}s`,
      memoryUsage: `${memoryUsedPercent}% - ${memoryUsageInMb}MB`,
      lastSync: new Date(),
      connections: connectionStatus,
    };

    return res.json(status);
  }
}

export { connectionStatus };
