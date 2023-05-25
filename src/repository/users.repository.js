import { db } from "../database/database.js";

export async function insertUserDB(username, img, email, password){
    const result = await db.query(`
        INSERT INTO "users" ("username", "img", "email", "password")
        VALUES ($1, $2, $3, $4);    
    `, [username, img, email, password]);
    return result;
}

export async function getUserByEmailDB(email){
    return await db.query(`SELECT * FROM "users" WHERE "email"=$1;`, [email]);
}
