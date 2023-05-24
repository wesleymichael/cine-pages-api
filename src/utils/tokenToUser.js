import jwt from "jsonwebtoken";

export function tokenToUser(token){
    const secretKey = process.env.JWT_SECRET;
    const user = jwt.verify(token, secretKey);
    return user;
}