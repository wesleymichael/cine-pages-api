import { insertSessionRepository, insertUserRepository } from "../repository/users.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signup(req, res){
    const {username, img, email, password} = req.body;

    try {
        const hash = bcrypt.hashSync(password, 10);
        await insertUserRepository(username, img, email, hash);  

        return res.sendStatus(201)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function signin(req, res){
    try{
        const user = res.locals.user;
        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign(user, secretKey);

        await insertSessionRepository(token);

        res.status(201).send({token});
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
