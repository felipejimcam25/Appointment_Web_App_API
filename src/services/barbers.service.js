import { deleteBarberModel, getAllBarbersModel, getBarberIdModel, insertBaberModel, updateBarberModel, createAdminUser } from "../models/barbers.model.js"
import { hashPassword } from '../utils/hash.js';
//GET ALL BARBERS SERVICE
export const getAllBarbersService = async () => {
    const barbers = await getAllBarbersModel();

    if(!barbers) throw new Error('Error getting Barbers');

    return barbers
}

//GET BARBER BY ID
export const getBarberByIdService = async (id) => {
    if(!id) throw new Error('Invalid Params');

    const barber = await getBarberIdModel(id);

    if(!barber) throw new Error('Baber Not Found');

    return barber;
}

//INSERT NEW BARBER SERVICE
export const insertBarberService = async (name, email, password, phone) => {
    if(!name) throw new Error('Empty Fields');

    const hashPass = await hashPassword(password);

    const user = await createAdminUser(name, email, hashPass, phone);

    if(!user) throw new Error('Error creating Barber');

    const user_id = user.id;

    const barber = await insertBaberModel(user_id, name)

    if(!barber) throw new Error('Error creating barber');

    return barber;
}


//UPDATE BARBERS SERVICE
export const updateBarberService = async (name, id) => {
    if(!name || !id) {
        throw new Error('Empty Fields');
    }

    const barber = await updateBarberModel(name, id);

    if(!barber) throw new Error('Error updating barber');
    
    return barber;
}

//DELETE BARBERS SERVICE
export const deletUserService = async (id) => {
    if(!id) throw new Error('Invalid Params');

    const barber = await deleteBarberModel(id)

    if(!barber) throw new Error('Barber Not Found');

    return barber;
}

