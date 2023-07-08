import { type InferModel } from "drizzle-orm";
import { mysqlTable, serial, text, varchar } from "drizzle-orm/mysql-core";

export const posts = mysqlTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
});

export type PostTable = InferModel<typeof posts>;
