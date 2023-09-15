export type StatusType = 'Online' | 'Offline';

export interface IConnectionStatus {
  apiStatus: StatusType;
  redisStatus: StatusType;
  mongoStatus: StatusType;
}
