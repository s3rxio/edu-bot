import { Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class CutCommandPipe implements PipeTransform {
  transform(value: string) {
    return value.split(" ").splice(1).join(" ").trim();
  }
}
