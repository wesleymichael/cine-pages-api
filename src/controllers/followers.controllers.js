import { getFollowingsDB } from "../repository/followers.reposity.js";
import { getPostsByUsernameDB } from "../repository/posts.repository.js";
import { tokenToUser } from "../utils/tokenToUser.js";

export async function getFollowings(req, res){
    const { username } = req.body;
    const session = res.locals.session;
    const user = tokenToUser(session.token);
    
    try {
        const userResult = await getPostsByUsernameDB(username);
        if(!userResult.rowCount) return res.status(404).send("Nome de usuário não cadastrado.");

        const followingResults = await getFollowingsDB(userResult.rows[0].id, user.id);
        return res.send(followingResults.rows);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
