import { insertUser } from "../repository/users.repository.js";

export async function signup(req, res){
    const {username, img, email, password} = req.body;
    try {
        await insertUser(username, img, email, password);  
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message);
    }
}