import { DbConfig } from "@/common/types";
import { join } from "path";
import { cwd } from "process";

export const dbConfig = (): DbConfig => ({
  type: "sqlite",
  database: join(cwd(), process.env.DB_PATH),
  entities: [],
  synchronize: true,
  logging: true
});
