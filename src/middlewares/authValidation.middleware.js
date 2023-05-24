import { getSessionRepository } from "../repository/users.repository.js";

export async function authValidation(req, res, next){
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if(!token) return res.sendStatus(401);

    try {
        const session = await getSessionRepository(token);

        if(session.rowCount === 0) return res.sendStatus(401);

        res.locals.session = session.rows[0];
        next();

    } catch (error) {
        return res.status(500).send(error.message);
    }   
}
