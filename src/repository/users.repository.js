import { db } from "../database/database.js";

export async function insertUserRepository(username, img, email, password){
    const result = await db.query(`
        INSERT INTO "users" ("username", "img", "email", "password")
        VALUES ($1, $2, $3, $4);    
    `, [username, img, email, password]);
    return result;
}

export async function insertSessionRepository(token){
    return await db.query(`INSERT INTO sessions (token) VALUES ($1);`, [token]);
}

export async function getUserByEmail(email){
    return await db.query(`SELECT * FROM "users" WHERE "email"=$1;`, [email]);
}

export async function getSession(token){
    return await db.query(`SELECT * FROM "sessions" WHERE token = $1;`, [token]);
}

export async function deleteSession(token){
    return await db.query(`DELETE FROM "sessions" WHERE token = $1;`, [token]);
}
