import { appoinmentByIdService, createAppointmentService, deleteAppointmentService, getAppointmentsByBarberService, getAppointmentsService, getTotalAppointmentsService, updateAppointmentService, updateAppointmentStatusService } from "../services/appointment.service.js";

//CONTROLLER TO CREATE AN APPOINTMENT
export const createAppointment = async ( req, res ) => {
    try {
        const { date, start_time, service_id, barber } = req.body;
        const client_id = req.user.id;

        const appointment = await createAppointmentService( date, start_time, service_id, barber, client_id );

        if(!appointment) return res.status(409).json({ message: 'Conflict creating the appointment' });

        return res.status(201).json({ 
            message: 'Appointment Scheduled',
            data: appointment
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

//CONTROLLER TO UPDATE AN APPOINTMENT
export const userUpdateAppointment = async (req, res) => {
    const { id } = req.params;
    const { date, start_time, service_id, barber, client_id } = req.body;

    try {

        const appointment = await updateAppointmentService(id, date, start_time, service_id, barber, client_id);

        if(!appointment) {
            return res.status(400).json({
                message: 'Error occured'
            })
        }

        return res.status(200).json({
            message: 'Appointment Updated',
            data: appointment
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}


//SERVICE TO DELETE AN APPOINTMENT
export const userDeleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        const appointment = await deleteAppointmentService(id);

        if(!appointment || appointment.length === 0) {
            return res.status(404).json({
                message: 'Appointment Not Found'
            })
        }

        return res.status(200).json({
            message: 'Appointment deleted',
            data: appointment
        })
        
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

//CONTROLLER TO GET AN APPOINTMENT BY ID
export const getAppointmentByUser = async (req, res) => {
    const id  = req.user.id;

    try {
        const appointment = await appoinmentByIdService(id);

        if(!appointment || appointment.length === 0) return res.status(404).json({ message: 'No appointment found' })

        return res.status(200).json({ 
            message: 'Appointment gotten successfully', 
            data: appointment 
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

//GET ALL APOINTMENTS(ADMIN PATH) CONTROLLER
export const userGetAllAppointments = async (req, res) => {
    try {
        const appointments = await getAppointmentsService();

        if(!appointments) {
            return res.status(400).json({
                message: 'Error getting all appointments'
            })
        }

        return res.status(200).json({
            message: 'All appointments gotten successfully',
            data: appointments
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

//UPDATE APPOINTMENT STATUS CONTROLLER
export const userUpdateAppointmentStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const appointment = await updateAppointmentStatusService(id, status);

        if(!appointment) {
            return res.status(400).json({
                message: 'Error updating appointment status'
            })
        }

        return res.status(200).json({
            message: 'Appointment Status Updated',
            data: appointment
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

//GET APPOINTMENTS BY BARBER CONTROLLER
export const getAppointmentsByBarber = async (req, res) => {
    const { id } = req.params;

    try {
        const appointments = await getAppointmentsByBarberService(id);

        if(!appointments) {
            return res.status(404).json({
                message: 'There is no appointments yet'
            })
        }

        return res.status(200).json({
            message: 'All appointments gotten successfully',
            data: appointments
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

//GET TOTAL APPOINTMENTS BY BARBER CONTROLLER
export const totalAppointmentsByBarber = async (req, res) => {
    const { id } = req.params;

    try {
        const total = await getTotalAppointmentsService(id);

        if(!total) {
            return res.status(404).json({
                message: 'There is no appoinments yet'
            })
        }

        return res.status(200).json({
            message: 'Total appointments gotten successfully',
            data: total
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}