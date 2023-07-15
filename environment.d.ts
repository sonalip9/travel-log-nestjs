declare namespace NodeJS {
  export interface ProcessEnv {
    readonly MONGO_DB: string;
    readonly JWT_SECRET: string;
    readonly JWT_EXPIRES_IN: string;
  }
}
