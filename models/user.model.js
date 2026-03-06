
import { integer, pgTable, varchar, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  firstName: varchar("first_name",{ length: 255 }).notNull(),
  lastName: varchar("last_name",{ length: 255 }),
  email: varchar("email",{ length: 255 }).notNull().unique(),
  salt: text().notNull(),
  password: text().notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
});