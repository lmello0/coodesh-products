import { DateTime } from 'luxon';
import { IConnectionStatus } from '../interfaces/IConnectionStatus';
import { IStatus } from '../interfaces/IStatus';
import { MongoRepositoryProtocol } from '../repositories/MongoRepositoryProtocol';
import os from 'os';

const connectionStatus: IConnectionStatus = {
  apiStatus: 'Offline',
  redisStatus: 'Offline',
  mongoStatus: 'Offline',
};

export class GetStatusService {
  constructor(private readonly db: MongoRepositoryProtocol) {}

  async execute(): Promise<IStatus> {
    const totalRam = os.totalmem();
    const memoryUsage = process.memoryUsage().rss;

    const memoryUsedPercent = (memoryUsage / totalRam).toFixed(2);
    const memoryUsageInMb = (memoryUsage / 1024 / 1024).toFixed(0);

    const lastHist = await this.db.findLastSync();

    let lastSync = 'Never';
    if (lastHist?.dateEnd) {
      lastSync = DateTime.fromSeconds(lastHist?.dateEnd).toFormat(
        'dd/mm/yyyy HH:mm:ss',
      );
    }

    const status: IStatus = {
      uptime: `${process.uptime().toFixed(2)}s`,
      memoryUsage: `${memoryUsedPercent}% - ${memoryUsageInMb}MB`,
      lastSync,
      connections: connectionStatus,
    };

    return status;
  }
}

export { connectionStatus };
