import { checkConflict, deleteAppointment, getAllAppointments, getAppointmentById, getAppointmentsByBarberModel, getTotalAppointmentsByBarberModel, insertAppointment, updateAppointment, updateAppointmentStatus } from "../models/appointment.model.js";
import { getServices } from "../models/services.model.js";
import { addMinutes } from "../utils/duration.js";

//SERVICE TO CREATE AN APPOINTMENT
export const createAppointmentService = async (date, start, service, barber, client) => {

    if(!date || !start || !service) {
        throw new Error('Empty fields');
    }

    const serviceResult = await getServices(service);

    if(!serviceResult) {
        throw new Error('Error, service not recognized');
    }

    const duration = serviceResult.duration;
    

    const end = addMinutes(start, duration);

    if(!end) {
        throw new Error('Error with the end time');
    }

    const conflict = await checkConflict(date, barber, start, end);

    console.log(conflict);
    

    if(conflict) {
        throw new Error('Time slot not available');
    }

    const appointment = await insertAppointment(date, start, end, serviceResult.id, barber, client);


    if(!appointment) {
        throw new Error('Error creating the appointment')
    }

    return appointment;

}


//SERVICE TO UPDATE AN APPOINTMENT
export const updateAppointmentService = async (id, date, start, service, barber, client) => {
    if(!id || !date || !start || !service || !barber || !client) {
        throw new Error('Empty Fields');
    }

    let duration;

    if(service) {
        const serviceResult = await getServices(service);

        if(!serviceResult) {
            throw new Error('Error, service not recognized');
        }

        duration = serviceResult.duration;
    }


    const end = await addMinutes(start, duration)

    if(!end) {
        throw new Error('Error with the end time');
    }

    const conflict = await checkConflict(date, barber, start, end)

    if(conflict) {
        throw new Error('Time slot not available')
    }

    const appointment = await updateAppointment(id, date, start, end, service, barber, client );

    if(!appointment) {
        throw new Error('Error updating appointment')
    }

    return appointment;
}


//SERVICE TO DELETE AN APPOINTMENT

export const deleteAppointmentService = async (id) => {
    if(!id) throw new Error('Error, appointment not found');

    const appointment = await deleteAppointment(id);


    if(!appointment) {
        throw new Error('Error deleting appointment')
    }

    return appointment;
}


//GET APPOINTMENT BY ID
export const appoinmentByIdService = async (id) => {
    if(!id) throw new Error('Id not provided');

    const appointment = await getAppointmentById(id);

    return appointment;
} 


//GET ALL APPOINTMENTS(ADMIN PATH) SERVICE

export const getAppointmentsService = async () => {
    const appointments = await getAllAppointments();

    if(!appointments) {
        throw new Error('Error getting all appointments');
    }

    return appointments;
}


//UPDATE APPOINTMENT STATUS SERVICE
export const updateAppointmentStatusService = async (id, status) => {
    if(!id || !status) throw new Error('Invalid parameters');

    const appointment = await updateAppointmentStatus(id, status);

    if(!appointment) {
        throw new Error('Error updating status');
    }

    return appointment;
}


//GET APPOINTMENTS BY BARBER
export const getAppointmentsByBarberService = async (id) => {
    if(!id) throw new Error('Invalid Params');

    const appointments = await getAppointmentsByBarberModel(id);

    if(!appointments) throw new Error('Error getting baber Appointments');

    return appointments;
}

//GET TOTAL APPOINTMENTS BY BARBER SERVICE

export const getTotalAppointmentsService = async (id) => {
    if(!id) throw new Error('Invalid Params');

    const total = await getTotalAppointmentsByBarberModel(id);

    if(!total) throw new Error('Error getting total');

    return total;
}