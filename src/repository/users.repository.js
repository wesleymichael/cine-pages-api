import { db } from "../database/database.js";

export async function insertUser(username, img, email, password){
    const result = await db.query(`
        INSERT INTO "users" ("username", "img", "email", "password")
        VALUES ($1, $2, $3, $4);    
    `, [username, img, email, password]);
    return result;
}

