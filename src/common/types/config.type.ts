import { TelegrafModuleOptions } from "nestjs-telegraf";

export interface TelegrafConfig extends TelegrafModuleOptions {}

export interface AppConfig {
  telegraf: TelegrafConfig;
}
