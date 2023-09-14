import { DateTime } from 'luxon';

export function unixNow() {
  return Math.floor(DateTime.now().toMillis() / 1000);
}
