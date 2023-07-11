import { relations, type InferModel } from "drizzle-orm";
import {
  int,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const posts = mysqlTable("posts", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 191 }).notNull(),
  title: varchar("name", { length: 191 }).notNull(),
  slug: text("slug").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type PostTable = InferModel<typeof posts>;

export const comments = mysqlTable("comments", {
  id: serial("id").primaryKey(),
  parentId: int("parentId"),
  text: text("text").notNull(),
  userId: varchar("userId", { length: 191 }).notNull(),
  postId: int("postId"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const commentsParentRelation = relations(comments, ({ one, many }) => ({
  parent: one(comments, {
    fields: [comments.parentId],
    references: [comments.id],
    relationName: "comment_children",
  }),
  children: many(comments),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
}));

export const postsRelations = relations(posts, ({ many }) => ({
  comments: many(comments),
}));
