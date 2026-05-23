
import { deleteUser, getLoyaltyUsers, getUserByIdModel, updateUser } from "../models/users.model.js"


//GET USERS BY ID SERVICE
export const getUserByIdService = async (id) => {
    if(!id) throw new Error('Invalid parameters');

    const user = await getUserByIdModel(id);

    if(!user) throw new Error('User Not Found');

    return user;
}

//UPDATE USERS BY ID SERVICES
export const updateUserService = async (name, email, role, phone, id) => {
    if(!name || !email || !role || !phone || !id) {
        throw new Error('Empty Fields')
    }

    const user = await updateUser(name, email, role, phone, id);

    if(!user) throw new Error('Error Updating user');

    return user;
}

//DELETE USERS SERVICES
export const deleteUserService = async (id) => {
    const user = await deleteUser(id);

    if(!user) throw new Error('User Not Found');

    return user;
}

//GET LOYALTY USERS SERVICE

export const loyaltyUsersService = async () => {
    const users = await getLoyaltyUsers();

    if(!users) throw new Error('Error getting loyalty users');

    return users;
}

