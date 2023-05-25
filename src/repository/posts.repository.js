import { db } from "../database/database.js";

export async function insertPostRepository(userId, description, img){
    const results = db.query(`
        INSERT INTO "posts" ("userId", "description", "img") 
            VALUES ($1, $2, $3);`
    , [userId, description, img]);
    return results;
}

export async function getPostsRepository(userId){
    const results = await db.query(`
        SELECT 
            u.username,
            u."img" AS "userImg",
            json_build_object(
                'id', p.id, 
                'img', p.img, 
                'description', p.description, 
                'likes', COUNT(l.id),
                'createAt', p."createdAt",
                'liked', CASE WHEN l."userId" IS NOT NULL THEN true ELSE false END
            ) AS post,
            json_build_object(
                '1', COUNT(CASE WHEN r.stars = 1 THEN 1 END),
                '2', COUNT(CASE WHEN r.stars = 2 THEN 1 END),
                '3', COUNT(CASE WHEN r.stars = 3 THEN 1 END),
                '4', COUNT(CASE WHEN r.stars = 4 THEN 1 END),
                '5', COUNT(CASE WHEN r.stars = 5 THEN 1 END)
            ) AS ratings
        FROM 
            users u
            JOIN posts p ON u.id = p."userId"
            LEFT JOIN likes l ON p.id = l."postId" AND l."userId" = $1
            LEFT JOIN ratings r ON r."postId" = p.id
        GROUP BY 
            u.username, u."img", p.id, p.img, l."userId";
        `, [userId]);
    return results;
}
