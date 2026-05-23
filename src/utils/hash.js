import bcrypt from 'bcrypt';

//METHOD TO ENCRYPT THE PASSWORD BEFORE SEND IT TO THE DB
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}