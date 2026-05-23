import { deletUserService, getAllBarbersService, getBarberByIdService, insertBarberService, updateBarberService } from "../services/barbers.service.js";

export const getBarbers = async (req, res) => {
    try {
        const barbers = await getAllBarbersService();

        if(!barbers) {
            return res.status(400).json({
                message: 'Error getting barbers'
            })
        }

        return res.status(200).json({
            message: 'All barbers gotten successfully',
            data: barbers
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
} 


export const getBaberById = async (req, res) => {
    const { id } = req.params;

    try {
        const barber = getBarberByIdService(id);

        if(!barber) {
            return res.status(404).json({
                message: 'Barber Not Found'
            })
        }

        return res.status(200).json({
            message: 'Barber Found',
            data: barber
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}



export const createBarber = async (req, res) => {
    const { name, email, password, role, phone } = req.body;

    try {
        const barber = await insertBarberService(name, email, password, phone);

        if(!barber) {
            return res.status(400).json({
                message: 'Error creating Baber'
            })
        }

        return res.status(201).json({
            message: 'Barber created successfully',
            data: barber
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
} 



export const updateBarber = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const barber = await updateBarberService(name, id);

        if(!barber) {
            return res.status(400).json({
                message: 'Error updating barber'
            })
        }

        return res.status(200).json({
            message: 'Barber Updated',
            data: barber
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}


export const deleteBarber = async (req, res) => {
    const { id } = req.params;

    try {
        const barber = await deletUserService(id);

        if(!barber) {
            return res.status(400).json({
                message: 'Error deleting barber'
            })
        }

        return res.status(200).json({
            message: 'Barber Deleted successfully',
            data: barber
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}