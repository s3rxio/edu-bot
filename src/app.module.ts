import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TelegrafModule } from "nestjs-telegraf";
import { getConfig } from "./config";
import { EchoModule } from "./echo/echo.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `${process.env.ENV_PATH}`,
        `.env.${process.env.NODE_ENV}`,
        `.env`,
        `.env.local`
      ],
      load: [getConfig],
      isGlobal: true
    }),
    TelegrafModule.forRoot({
      token: process.env.TELEGRAF_TOKEN
    }),
    EchoModule
  ]
})
export class AppModule {}
