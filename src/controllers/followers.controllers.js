import { followDB, getFollowersDB, getFollowingsDB, unfollowDB } from "../repository/followers.reposity.js";
import { getPostsByUsernameDB } from "../repository/posts.repository.js";
import { getUserByUsernameDB } from "../repository/users.repository.js";
import { tokenToUser } from "../utils/tokenToUser.js";

export async function getFollowings(req, res){
    const { username } = req.body;
    const session = res.locals.session;
    const user = tokenToUser(session.token);
    
    try {
        const userResult = await getUserByUsernameDB(username);
        if(!userResult.rowCount) return res.status(404).send("Nome de usuário não cadastrado.");

        const followingResults = await getFollowingsDB(userResult.rows[0].id, user.id);
        return res.send(followingResults.rows);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function getFollowers(req, res){
    const { username } = req.body;
    const session = res.locals.session;
    const user = tokenToUser(session.token);
    
    try {
        const userResult = await getUserByUsernameDB(username);
        if(!userResult.rowCount) return res.status(404).send("Nome de usuário não cadastrado.");

        const followersResults = await getFollowersDB(userResult.rows[0].id, user.id);
        return res.send(followersResults.rows);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function follow(req, res){
    const { username } = req.body;
    const session = res.locals.session;
    const user = tokenToUser(session.token);

    try {
        const userResult = await getUserByUsernameDB(username);
        if(!userResult.rowCount) return res.status(404).send("Nome de usuário não cadastrado.");

        const results = await followDB(userResult.rows[0].id, user.id);
        if(!results.rowCount) return res.status(409).send("Usuário já está sendo seguido!");
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function unfollow(req, res){
    const { username } = req.body;
    const session = res.locals.session;
    const user = tokenToUser(session.token);

    try {
        const userResult = await getUserByUsernameDB(username);
        if(!userResult.rowCount) return res.status(404).send("Nome de usuário não cadastrado.");

        const results = await unfollowDB(userResult.rows[0].id, user.id);
        if(!results.rowCount) return res.status(409).send("Usuário não está sendo seguido!");
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).send(error.message);
    }    
}
