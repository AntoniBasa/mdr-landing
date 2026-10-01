import "server-only";

const LOCAL_SITE_URL: string = "http://localhost:3000";

const readEnvironmentValue = (variableName: string): string | undefined => {
  const rawValue: string | undefined = process.env[variableName];

  if (rawValue === undefined) {
    return undefined;
  }

  const trimmedValue: string = rawValue.trim();

  if (trimmedValue === "") {
    return undefined;
  }

  return trimmedValue;
};

const getSiteUrl = (): URL => {
  const configuredSiteUrl: string | undefined = readEnvironmentValue("SITE_URL");

  if (configuredSiteUrl !== undefined) {
    return new URL(configuredSiteUrl);
  }

  const vercelProductionHost: string | undefined = readEnvironmentValue(
    "VERCEL_PROJECT_PRODUCTION_URL",
  );

  if (vercelProductionHost !== undefined) {
    return new URL(`https://${vercelProductionHost}`);
  }

  return new URL(LOCAL_SITE_URL);
};

export { getSiteUrl };
