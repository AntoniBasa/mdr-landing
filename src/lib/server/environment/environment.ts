import "server-only";

const readOptionalEnvironmentVariable = (variableName: string): string | undefined => {
  const rawValue: string | undefined = process.env[variableName];

  if (rawValue === undefined || rawValue.trim() === "") {
    return undefined;
  }

  return rawValue.trim();
};

export { readOptionalEnvironmentVariable };
