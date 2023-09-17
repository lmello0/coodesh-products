export interface IUser {
  email: string;
  password: string;
  apiKey: string;
  usageQuota: [
    {
      day: string;
      usage: number;
    },
  ];
}
