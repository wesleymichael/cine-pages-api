import { db } from "../database/database.js";

export async function insertSessionDB(token){
    return await db.query(`INSERT INTO sessions (token) VALUES ($1);`, [token]);
}

export async function getSessionDB(token){
    return await db.query(`SELECT * FROM "sessions" WHERE token = $1;`, [token]);
}

export async function deleteSessionDB(token){
    return await db.query(`DELETE FROM "sessions" WHERE token = $1;`, [token]);
}
