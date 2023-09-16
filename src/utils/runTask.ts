import { calculateTimeUntilNextExecution } from './calculateNextExecution';
import { parseCronSchedule } from './parseCron';

export function runScheduledTask(
  cronString: string,
  taskFunction: CallableFunction,
) {
  const schedule = parseCronSchedule(cronString);
  const timeUntilNextExecution = calculateTimeUntilNextExecution(schedule);

  setTimeout(function () {
    taskFunction();
    runScheduledTask(cronString, taskFunction);
  }, timeUntilNextExecution);
}
