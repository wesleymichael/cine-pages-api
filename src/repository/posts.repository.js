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
                'createdAt', p."createdAt",
                'likes', COUNT(l.id),
                'liked', EXISTS (SELECT 1 FROM likes WHERE likes."userId" = $1 AND likes."postId" = p.id)
            ) AS post,
            (
                SELECT json_build_object(
                    '1', COUNT(*) FILTER (WHERE r.stars = 1),
                    '2', COUNT(*) FILTER (WHERE r.stars = 2),
                    '3', COUNT(*) FILTER (WHERE r.stars = 3),
                    '4', COUNT(*) FILTER (WHERE r.stars = 4),
                    '5', COUNT(*) FILTER (WHERE r.stars = 5)
                )
                FROM ratings r
                WHERE r."postId" = p.id
            ) AS ratings
        FROM
            users u
            JOIN posts p ON u.id = p."userId"
            LEFT JOIN likes l ON p.id = l."postId"
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
        SELECT
            u.id,
            u.username,
            u.img AS "imgUser",
            EXISTS (SELECT 1 FROM followers WHERE "userId" = $2 AND following = u.id) AS "isFollowing",
            (SELECT COUNT(*) FROM followers WHERE following = u.id) AS followers,
            (SELECT COUNT(*) FROM followers WHERE "userId" = u.id) AS following,
            (
                SELECT json_agg(post_details)
                FROM (
                    SELECT
                        p.id AS post_id,
                        json_build_object(
                            'id', p.id,
                            'img', p.img,
                            'description', p.description,
                            'createdAt', p."createdAt",
                            'likes', COALESCE(likes.count, 0),
                            'liked', COALESCE(likes.liked, false),
                            'ratings', (
                                SELECT json_build_object(
                                    '1', COUNT(*) FILTER (WHERE r.stars = 1),
                                    '2', COUNT(*) FILTER (WHERE r.stars = 2),
                                    '3', COUNT(*) FILTER (WHERE r.stars = 3),
                                    '4', COUNT(*) FILTER (WHERE r.stars = 4),
                                    '5', COUNT(*) FILTER (WHERE r.stars = 5)
                                )
                                FROM ratings r
                                WHERE r."postId" = p.id
                            )
                        ) AS post_details
                    FROM
                        posts p
                    LEFT JOIN (
                        SELECT
                            "postId",
                            COUNT(*) AS count,
                            EXISTS (SELECT 1 FROM likes WHERE likes."userId" = $2 AND likes."postId" = "postId") AS liked
                        FROM
                            likes
                        GROUP BY
                            "postId"
                    ) likes ON p.id = likes."postId"
                    WHERE
                        p."userId" = u.id
                ) subquery
            ) AS "postsUsername"
        FROM
            users u
        WHERE
            u.username = $1
        GROUP BY
            u.username,
            u.id,
            u.img;
    `, [username, myUserId]);
    return results;
}

