import "server-only";

const warnedVariableNames: Set<string> = new Set<string>();

const warnAboutMissingVariable = (variableName: string, fallbackDescription: string): void => {
  if (warnedVariableNames.has(variableName)) {
    return;
  }

  warnedVariableNames.add(variableName);
  console.warn(
    `\n⚠️  [mdr] ${variableName} is not set — ${fallbackDescription}.\n` +
      `   Add it to .env.local (see .env.example) to enable the integration.\n`,
  );
};

const readOptionalEnvironmentVariable = (
  variableName: string,
  fallbackDescription: string,
): string | undefined => {
  const rawValue: string | undefined = process.env[variableName];

  if (rawValue !== undefined && rawValue.trim() !== "") {
    return rawValue.trim();
  }

  warnAboutMissingVariable(variableName, fallbackDescription);

  return undefined;
};

export { readOptionalEnvironmentVariable };
