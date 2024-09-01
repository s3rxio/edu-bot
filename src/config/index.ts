import { AppConfig } from "@/common/types";
import { telegrafConfig } from "./telegraf.config";

export const appConfig = (): AppConfig => ({
  telegraf: telegrafConfig()
});
