import { Logger, Module, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { InjectBot, TelegrafModule } from "nestjs-telegraf";
import { appConfig } from "./config";
import { EchoModule } from "./echo/echo.module";
import { Context, Telegraf } from "telegraf";
import { DbConfig, TelegrafConfig } from "./common/types";
import { TypeOrmModule } from "@nestjs/typeorm";

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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get<DbConfig>("db"),
      inject: [ConfigService]
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
