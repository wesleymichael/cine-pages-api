import { getUsersDB } from "../repository/users.repository.js";

export async function getUsersFilter(req, res){
    const filter = req.query.filter;
    try {
        const result = await getUsersDB(filter);
        return res.send(result.rows);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
