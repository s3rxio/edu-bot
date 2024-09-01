import { AppConfig } from "@/common/types";
import { telegrafConfig } from "./telegraf.config";
import { dbConfig } from "./db.config";

export const appConfig = (): AppConfig => ({
  telegraf: telegrafConfig(),
  db: dbConfig()
});
