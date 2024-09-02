import { DbConfig } from "@/common/types";
import { GroupEntity } from "@/group/group.entity";
import { join } from "path";
import { cwd } from "process";

export const dbConfig = (): DbConfig => ({
  type: "sqlite",
  database: join(cwd(), process.env.DB_PATH),
  entities: [GroupEntity],
  synchronize: true,
  logging: true
});
