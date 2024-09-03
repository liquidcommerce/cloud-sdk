declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface ProcessEnv {
    API_KEY: string;
    GOOGLE_PLACES_API_KEY: string;
    NODE_ENV: 'local' | 'dev' | 'staging' | 'production';
    ENV_LOC: string;
    ENV_DEV: string;
    ENV_STAGE: string;
    ENV_PROD: string;
  }
}
