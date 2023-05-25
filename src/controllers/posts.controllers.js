import { getPostsDB, insertPostDB } from "../repository/posts.repository.js";
import { tokenToUser } from "../utils/tokenToUser.js";

export async function createPost(req, res){
    const {description, img} = req.body;
    const session = res.locals.session;
    const user = tokenToUser(session.token);

    try {
        await insertPostDB(user.id, description, img);
        return res.sendStatus(201);        
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function getPosts(req, res){
    const session = res.locals.session;
    const user = tokenToUser(session.token);
    
    try {
        const results = await getPostsDB(user.id);
        return res.send(results.rows);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

// export async function getPostsByUsername(req, res){
//     const session = res.locals.session;
//     const user = tokenToUser(session.token);
    
//     try {
//         const results = 1;
//     } catch (error) {
//         return res.status(500).send(error.message);
//     }
// }
