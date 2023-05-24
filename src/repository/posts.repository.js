import { db } from "../database/database.js";

export async function insertPostRepository(userId, description, img){
    const results = db.query(`
        INSERT INTO "posts" ("userId", "description", "img") 
            VALUES ($1, $2, $3);`
    , [userId, description, img]);
    return results;
}
