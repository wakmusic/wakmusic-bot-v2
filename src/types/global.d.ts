declare namespace NodeJS {
  interface ProcessEnv {
    TOKEN: string;
    CLIENT_ID: string;
    DEPLOY: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USER_NAME: string;
    DB_USER_PASSWORD: string;
  }
}
