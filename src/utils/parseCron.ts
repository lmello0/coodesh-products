export function parseCronSchedule(cronString: string) {
  const cronParts = cronString.split(' ');

  if (cronParts.length !== 5) {
    throw new Error('Invalid cron schedule format');
  }

  const [minute, hour] = cronParts;

  return {
    minute: parseInt(minute),
    hour: parseInt(hour),
  };
}
