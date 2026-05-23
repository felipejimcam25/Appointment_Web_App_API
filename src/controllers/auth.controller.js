import { 
    loginUser,
    registerUser
} from '../services/auth.service.js';


//LOGIN CONTROLLER
export const login = async (req, res) => {
    const { identifier, password } = req.body;



    if(!identifier || !password) {
        return res.status(400).json({
            message: 'Empty fields'
        });
    }

    try {
        const result = await loginUser(identifier, password);
            console.log(result);
            
        return res.status(200).json({
            message: 'Login Successfully',
            data: result
        })
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: err.message
        })
    }
}

//REGISTER NEW USER CONTROLLER
export const register = async (req, res) => {
    const { name, username, email, password, phone} = req.body;
    try {
        console.log(name);
        
        const result = await registerUser(name, username, email, password, phone);

        

        if(!result) {
            return res.status(400).json({
                message: 'Registration Error'
            })
        }

        return res.status(201).json({
            message: 'User Created',
            data: result
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}

export const logout = (req, res) => {
    return res.status(200).json({
        message: 'Logout Successfully'
    })
}