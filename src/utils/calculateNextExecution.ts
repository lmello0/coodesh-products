import { ISchedule } from '../interfaces/ISchedule';

export function calculateTimeUntilNextExecution(schedule: ISchedule) {
  const now = new Date();
  const nextExecution = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    schedule.hour,
    schedule.minute,
  );

  if (nextExecution <= now) {
    nextExecution.setDate(nextExecution.getDate() + 1);
  }

  return nextExecution.getTime() - now.getTime();
}
