import { db } from "../database/database.js";

export async function insertPostDB(userId, description, img){
    const results = db.query(`
        INSERT INTO "posts" ("userId", "description", "img") 
            VALUES ($1, $2, $3);`
    , [userId, description, img]);
    return results;
}

export async function getPostsDB(userId){
    const results = await db.query(`
        SELECT
            u.username,
            u."img" AS "userImg",
            json_build_object(
                'id', p.id,
                'img', p.img,
                'description', p.description,
                'totalLikes', COUNT(l.id),
                'liked', EXISTS (SELECT 1 FROM likes WHERE likes."userId" = $1 AND likes."postId" = p.id)
            ) AS post,
            json_build_object(
                '1', COUNT(r.stars) FILTER (WHERE r.stars = 1),
                '2', COUNT(r.stars) FILTER (WHERE r.stars = 2),
                '3', COUNT(r.stars) FILTER (WHERE r.stars = 3),
                '4', COUNT(r.stars) FILTER (WHERE r.stars = 4),
                '5', COUNT(r.stars) FILTER (WHERE r.stars = 5)
            ) AS ratings
        FROM
            users u
            JOIN posts p ON u.id = p."userId"
            LEFT JOIN likes l ON p.id = l."postId"
            LEFT JOIN ratings r ON r."postId" = p.id
        GROUP BY
            u.username,
            u."img",
            p.id,
            p.img,
            p.description;
        `, [userId]);
    return results;
}

export async function getPostsByUsernameDB(username, myUserId){
    const results = await db.query(`
    WITH user_data AS (
        SELECT
            u.username, u.id,
            u.img AS "imgUser",
            EXISTS (SELECT 1 FROM followers WHERE "userId" = $2 AND following = u.id) AS "isFollowing",
            (SELECT COUNT(*) FROM followers WHERE following = u.id) AS "followers",
            (SELECT COUNT(*) FROM followers WHERE "userId" = u.id) AS "following"
        FROM
            users u
        WHERE
            u.username = $1
    ),
    post_data AS (
        SELECT
            p.id, p."userId",
            p.img,
            p.description,
            COUNT(l.id) AS "likes",
            EXISTS (SELECT 1 FROM likes WHERE "userId" = $2 AND "postId" = p.id) AS "liked",
            json_build_object(
                '1', COUNT(r.stars) FILTER (WHERE r.stars = 1),
                '2', COUNT(r.stars) FILTER (WHERE r.stars = 2),
                '3', COUNT(r.stars) FILTER (WHERE r.stars = 3),
                '4', COUNT(r.stars) FILTER (WHERE r.stars = 4),
                '5', COUNT(r.stars) FILTER (WHERE r.stars = 5)
            ) AS ratings
        FROM
            posts p
        LEFT JOIN likes l ON p.id = l."postId"
        LEFT JOIN ratings r ON p.id = r."postId"
        GROUP BY
            p.id
    )
    SELECT
        ud.id,
        ud.username,
        ud."imgUser",
        ud."isFollowing",
        ud."followers",
        ud."following",
        (
            SELECT json_agg(json_build_object(
                'id', pd.id,
                'img', pd.img,
                'description', pd.description,
                'likes', pd."likes",
                'liked', pd."liked",
                'ratings', pd.ratings
            ))
            FROM post_data pd
            WHERE pd."userId" = ud.id
        ) AS "posts"
    FROM
        user_data ud;
    `, [username, myUserId]);
    return results;
}