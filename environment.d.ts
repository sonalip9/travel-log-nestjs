declare namespace NodeJS {
  export interface ProcessEnv {
    MONGO_DB: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
  }
}
