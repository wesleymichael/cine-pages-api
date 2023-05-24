import { getUserByEmailRepository } from "../repository/users.repository.js";
import bcrypt from "bcrypt";

export async function validateSignin(req, res, next){
    const {email, password} = req.body;

    try {
        const results = await getUserByEmailRepository(email);

        if(!results.rowCount) return res.sendStatus(404);

        const isPasswordCorrect = bcrypt.compareSync(password, results.rows[0].password);
        if(!isPasswordCorrect) return res.sendStatus(401);

        res.locals.user = results.rows[0];
        next();
    } catch (error) {
        return res.status(500).send(error.message);
    }

}