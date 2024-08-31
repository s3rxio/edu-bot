import { Logger, Module, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { InjectBot, TelegrafModule } from "nestjs-telegraf";
import { getConfig } from "./config";
import { EchoModule } from "./echo/echo.module";
import { Context, Telegraf } from "telegraf";

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
export class AppModule implements OnApplicationBootstrap {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  async onApplicationBootstrap() {
    const me = await this.bot.telegram.getMe();
    Logger.log(`${me.username} started. Listening messages...`);
  }
}
