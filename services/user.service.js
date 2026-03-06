import {usersTable} from "../models/user.model.js";
import {db} from "../db/index.js"
import {eq} from "drizzle-orm"

export async function getUserByEmail(email){
    const [existingUser] = await db.select({
        id: usersTable.id,
        email:usersTable.email,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName,
        salt: usersTable.salt,
        password: usersTable.password
    })
    .from(usersTable)
    .where((table)=>eq(table.email,email))
    return existingUser
}

export async function createUser({
    email,
  firstName,
  lastName,
  salt,
  password
}){
  const [user] = await db
    .insert(usersTable)
    .values({
      email,
      firstName,
      lastName,
      salt,
      password
    })
    .returning({ id: usersTable.id });

  return user;  
}