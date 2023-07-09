import { type InferModel } from "drizzle-orm";
import {
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const posts = mysqlTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("name", { length: 191 }).notNull(),
  slug: text("slug").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type PostTable = InferModel<typeof posts>;
