
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

//MIDDLEWARE TO VALIDATE IF THE USER IS AN ADMIN OR JUST A SIMPLE USER
export const isAdmin = (req, res, next) => {
    console.log(req.user.role);
    
    if(req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' })
    }
    next();
}


//MIDDLEWARE TO VALIDATE TOKENS
export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token) {
        return res.status(401).json({message: 'No token provided'});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded;

    next();
}