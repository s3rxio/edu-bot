import { TelegrafConfig } from "@/common/types";

export const telegrafConfig = (): TelegrafConfig => ({
  token: process.env.TELEGRAF_TOKEN
});
