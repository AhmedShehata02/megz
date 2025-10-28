import { index, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
  },
  (Table) => [
    index("users_email_index").on(Table.email),
  ]
);

export type User = typeof usersTable.$inferSelect;