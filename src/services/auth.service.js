import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { getUserByIdentifier, insertNewUser } from '../models/users.model.js';
import { hashPassword } from '../utils/hash.js';


dotenv.config();
//LOGIN SERVICE FUNCTION
export const loginUser = async (identifier, password) => {//THIS GETS THE IDENTIFIER AND THE PASS THAT COMES FROM THE CONTROLLER
    const user = await getUserByIdentifier(identifier);//THIS AWAIT FOR A RESPONSE FROM THE MODEL THAT SEARCH FOR A USER WITH THIS IDENTIFIER

    //VALIDATION IF THE USER DOESN'T EXISTS
    if(!user) {
        throw new Error('User Not found');
    }

    //VALIDATE PASSWORD COMPARING THE USER USER THAT RETURNS THE MODEL WITH THE PARAMETER PASSWORD USING BCRYPT 
    const isValid = await bcrypt.compare(password, user.password);

    //IF THE PASSWORD DOESN'T MATCH IT THROWS AN ERROR
    if(!isValid) {
        throw new Error('Invalid Credentials');
    }

    //THIS PART CREATE THE LOGIN TOKEN
    const token = jwt.sign(
        { id: user.id, role: user.role },//this is the data putting in the token(create a token that contains user's identity and role)
        process.env.JWT_SECRET_KEY,//GET THE SECRETJSONKEY FROM .ENV FILE
        { expiresIn: "2h" }//THE TOKEN EXPIRES AFTER AN HOUR
    )

    const { password: _, ...safeUser } = user;

    //RETURNS THE USER INFO AND TOKEN
    return { user: safeUser, token, type: "Bearer" };
}

//REGISTER NEW USER SERVICE
export const registerUser = async (name, username, email, password, phone) => {

    const hashPass = await hashPassword(password);

    const user = await insertNewUser(name, username, email, hashPass, phone);

    if(!user) throw new Error('Registration Error');

    return user;
}


