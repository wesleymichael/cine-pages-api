import { insertUser } from "../repository/users.repository.js";
import bcrypt from "bcrypt";

export async function signup(req, res){
    const {username, img, email, password} = req.body;

    try {
        const hash = bcrypt.hashSync(password, 10);
        await insertUser(username, img, email, hash);  

        return res.sendStatus(201)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

