declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface ProcessEnv {
    API_KEY: string;
    GOOGLE_PLACES_API_KEY: string;
    ENV: 'local' | 'dev' | 'stage' | 'prod';
  }
}