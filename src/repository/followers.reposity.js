import { db } from "../database/database.js";

export async function getFollowingsDB(usernameId, myUserId){
    const results = await db.query(`
        SELECT
            u.id,
            u.username,
            u.img,
            EXISTS (SELECT 1 FROM followers WHERE "userId" = $2 AND following = u.id) AS "isFollowing"
        FROM 
            users u
        JOIN
            followers f ON u.id = f."following"
        WHERE
            f."userId" = $1;
    `, [usernameId, myUserId]);
    return results;
}