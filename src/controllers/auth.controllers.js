import { deleteSessionDB, insertSessionDB } from "../repository/auth.repository.js";
import { getUserByEmailDB, insertUserDB } from "../repository/users.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signup(req, res){
    const {username, img, email, password} = req.body;

    try {
        const hash = bcrypt.hashSync(password, 10);
        await insertUserDB(username, img, email, hash);

        return res.sendStatus(201)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function signin(req, res){
    const {email, password} = req.body;

    try{
        const results = await getUserByEmailDB(email);

        if(!results.rowCount) return res.status(404).send("Email não cadastrado!");

        const isPasswordCorrect = bcrypt.compareSync(password, results.rows[0].password);
        if(!isPasswordCorrect) return res.sendStatus(401);

        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign(results.rows[0], secretKey);

        await insertSessionDB(token);

        res.status(201).send({token, user: results.rows[0]});
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function logout(req, res){
    const session = res.locals.session;
    try {
        await deleteSessionDB(session.token);
        res.sendStatus(200);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}