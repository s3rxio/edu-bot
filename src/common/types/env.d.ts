declare namespace NodeJS {
  export interface ProcessEnv {
    TELEGRAF_TOKEN: string;
    NODE_ENV: string | "development" | "production" | "test";

    DB_PATH: string;
  }
}
