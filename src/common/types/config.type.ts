import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { TelegrafModuleOptions } from "nestjs-telegraf";

export type TelegrafConfig = TelegrafModuleOptions;
export type DbConfig = TypeOrmModuleOptions;

export interface AppConfig {
  telegraf: TelegrafConfig;
  db: DbConfig;
}
