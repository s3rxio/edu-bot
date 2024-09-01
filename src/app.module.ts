import { Logger, Module, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { InjectBot, TelegrafModule } from "nestjs-telegraf";
import { appConfig } from "./config";
import { EchoModule } from "./echo/echo.module";
import { Context, Telegraf } from "telegraf";
import { TelegrafConfig } from "./common/types";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `${process.env.ENV_PATH}`,
        `.env.${process.env.NODE_ENV}`,
        `.env`,
        `.env.local`
      ],
      load: [appConfig],
      isGlobal: true
    }),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get<TelegrafConfig>("telegraf"),
      inject: [ConfigService]
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
