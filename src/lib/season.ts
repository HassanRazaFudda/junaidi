/** Days remaining until an ISO datetime deadline. Negative once the deadline has passed. */
export function daysUntil(isoDateTime: string, now: number = Date.now()): number {
  const ms = Date.parse(isoDateTime) - now;
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export function isPastDeadline(isoDateTime: string, now: number = Date.now()): boolean {
  return now > Date.parse(isoDateTime);
}

export function isPackageExpired(validUntilIsoDate: string, now: number = Date.now()): boolean {
  return now > Date.parse(validUntilIsoDate);
}
