export const getEnv = (
  key: string,
  defaultValue?: string
): string => {
  const value = process.env[key as keyof NodeJS.ProcessEnv];

  if (value === undefined) {
    if (defaultValue === undefined) {
      throw new Error(`Environment variable ${key} is not set`);
    }
    return defaultValue;
  }

  return value;
};

export default getEnv;
