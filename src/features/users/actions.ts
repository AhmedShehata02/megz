"use server";

import { db } from "@/drizzle";
import { usersTable } from "@/drizzle/schema";
import { table } from "console";
import { getTableColumns } from "drizzle-orm";
import z from "zod";
import { fr } from "zod/locales";

export async function fetchUsers() {
  // Implementation for fetching users
  return db.select(getTableColumns(usersTable)).from(usersTable);
}

export async function createUser(unsafedata: { name: string; email: string; age: number }) {
  // Implementation for creating a new user
  const userSchema = z.object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    age: z.number().min(0, { message: "Age must be a positive number" }),
  });

  const { data, success, error } = userSchema.safeParse(unsafedata);
  if (!success) {
    throw new Error("Invalid user data: " + JSON.stringify(error.format()));
  } else {
    const newUser = await db
      .insert(usersTable)
      .values({
        age: data.age,
        name: data.name,
        email: data.email,
      })
      .returning(getTableColumns(usersTable)).then((res) => res[0]);
    return newUser;
  }
}
