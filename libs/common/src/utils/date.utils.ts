export function isTimeTruncated(date: Date): boolean {
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();
  return minutes === 0 && seconds === 0 && milliseconds === 0;
}
