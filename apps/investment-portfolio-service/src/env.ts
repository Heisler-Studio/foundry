export type Env = {
  databaseUrl: string;
  port: number;
};

const required = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `${name} is not set. Copy .env.example to .env and run through \`op run --env-file=.env --\`.`,
    );
  }
  return value;
};

export const loadEnv = (): Env => ({
  databaseUrl: required('DATABASE_URL'),
  port: Number(process.env.PORT ?? 4000),
});
