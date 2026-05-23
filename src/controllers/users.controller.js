//Utils IMPORTATION
import { hashPassword } from '../utils/hash.js';

//MODEL IMPORTATION
import { 
    getAllUsers
} from '../models/users.model.js';
import { deleteUserService, getUserByIdService, loyaltyUsersService, updateUserService } from '../services/users.service.js';

//GET ALL USERS CONTROLLER, IT RETURNS ALL USERS IN THE DB
export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        return res.status(200).json({
            message: 'Users gotten successfully', 
            data: users
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error getting users from DB' });
    }
}

//GET USERS BY ID CONTROLLER
export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await getUserByIdService(id);

        if(!user) {
            return res.status(404).json({
                message: 'User Not found'
            })
        }

        return res.status(200).json({
            message: 'User Found',
            data: user
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

}

//DELETE USERS CONTROLLER
export const adminDeleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await deleteUserService(id);

        if(!user) return res.status(404).json('User Not Found');

        res.status(200).json({
            message: 'User Deleted'
        })
    } catch (err) {
        res.status(500).json({
            message: 'Error deleting user'
        })
    }
}


//GET LOYALTY USERS
export const userGetLoyaltyUsers = async (req, res) => {
    try {
        const users = await loyaltyUsersService();

        if(!users) return res.status(400)/json({ message: 'Error getting users' });

        return res.status(200).json({ 
            message: 'Loyalty Users',
            data: users 
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}


//UPDATE USERS CONTROLLER
export const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { name, username, email, role, phone } = req.body;

    try {
        
        const user = await updateUserService(name, username, email, role, phone, id);

        if(!user) return res.status(400).json({ message: 'Error, Something went wrong' });

        return res.status(200).json({
            message: 'User updated successfully',
            data: user
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
