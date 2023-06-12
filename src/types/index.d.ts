declare namespace NodeJS {
  interface ProcessEnv {
    TOKEN: string;
    CLIENT_ID: string;
    DEPLOY: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USER_NAME: string;
    DB_USER_PASSWORD: string;
    R2_BUCKET_NAME: string;
    R2_CLIENT_ID: string;
    R2_ACCESS_KEY_ID: string;
    R2_SECRET_ACCESS_KEY: string;
    R2_BASE_URL: string;
  }
}
