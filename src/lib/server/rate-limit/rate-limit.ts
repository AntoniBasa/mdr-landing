import "server-only";
import type { RateLimitChecker, RateLimiterOptions, RateLimitResult } from "./types";

const MAX_TRACKED_KEYS: number = 1000;
const UNKNOWN_CLIENT: string = "unknown";

const createRateLimiter = (options: RateLimiterOptions): RateLimitChecker => {
  const { limit, windowMilliseconds } = options;
  const requestTimesByKey: Map<string, number[]> = new Map<string, number[]>();

  const isInsideWindow = (requestTime: number, currentTime: number): boolean => {
    return currentTime - requestTime < windowMilliseconds;
  };

  const removeIdleKeys = (currentTime: number): void => {
    for (const [storedKey, requestTimes] of requestTimesByKey) {
      const hasRecentRequest: boolean = requestTimes.some((requestTime: number): boolean =>
        isInsideWindow(requestTime, currentTime),
      );

      if (!hasRecentRequest) {
        requestTimesByKey.delete(storedKey);
      }
    }
  };

  const checkRateLimit = (key: string): RateLimitResult => {
    const currentTime: number = Date.now();
    const storedRequestTimes: number[] = requestTimesByKey.get(key) ?? [];
    const recentRequestTimes: number[] = storedRequestTimes.filter(
      (requestTime: number): boolean => isInsideWindow(requestTime, currentTime),
    );

    if (recentRequestTimes.length >= limit) {
      requestTimesByKey.set(key, recentRequestTimes);
      const oldestRequestTime: number = recentRequestTimes[0];
      const retryAfterMilliseconds: number = oldestRequestTime + windowMilliseconds - currentTime;

      return { allowed: false, retryAfterSeconds: Math.ceil(retryAfterMilliseconds / 1000) };
    }

    recentRequestTimes.push(currentTime);
    requestTimesByKey.set(key, recentRequestTimes);

    if (requestTimesByKey.size > MAX_TRACKED_KEYS) {
      removeIdleKeys(currentTime);
    }

    return { allowed: true };
  };

  return checkRateLimit;
};

const getClientIpAddress = (request: Request): string => {
  const forwardedHeader: string | null = request.headers.get("x-forwarded-for");

  if (forwardedHeader !== null) {
    const firstForwardedAddress: string = forwardedHeader.split(",")[0].trim();

    if (firstForwardedAddress !== "") {
      return firstForwardedAddress;
    }
  }

  const realIpHeader: string | null = request.headers.get("x-real-ip");

  if (realIpHeader !== null && realIpHeader !== "") {
    return realIpHeader;
  }

  return UNKNOWN_CLIENT;
};

export { createRateLimiter, getClientIpAddress };
