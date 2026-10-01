type RateLimiterOptions = {
  limit: number;
  windowMilliseconds: number;
};

type RateLimitAllowed = {
  allowed: true;
};

type RateLimitRejected = {
  allowed: false;
  retryAfterSeconds: number;
};

type RateLimitResult = RateLimitAllowed | RateLimitRejected;

type RateLimitChecker = (key: string) => RateLimitResult;

export type {
  RateLimiterOptions,
  RateLimitAllowed,
  RateLimitRejected,
  RateLimitResult,
  RateLimitChecker,
};
