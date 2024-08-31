import { Command, Message, Update } from "nestjs-telegraf";
import { EchoService } from "./echo.service";
import { CutCommandPipe } from "@/common/pipes";

@Update()
export class EchoUpdate {
  constructor(private readonly echoService: EchoService) {}

  @Command("echo")
  echo(
    @Message("text", CutCommandPipe)
    text: string
  ) {
    return this.echoService.echo(text);
  }
}
