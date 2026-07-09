import { Router } from 'express';

//USER CONTROLLLERS IMPORTATION
import {  
    getUserById,
    getUsers, 
    updateUserById, 
    userGetLoyaltyUsers
} from '../controllers/users.controller.js';

//WORKINGHOURS CONTROLLLERS IMPORTATION
import { 
    addDayHours, 
    getWorkingHours 
} from '../controllers/workingHours.controller.js';


import { 
    isAdmin, 
    verifyToken
} from '../middlewares/auth.middleware.js';

//AVAILABILITY CONTROLLER IMPORTATION
import { getAvailability } from '../controllers/availability.controller.js';

//AUTHCONTROLLER IMPORTATION
import { 
    login, 
    logout, 
    register 
} from '../controllers/auth.controller.js';

import { 
    createAppointment, 
    getAppointmentByUser, 
    getAppointmentsByBarber, 
    totalAppointmentsByBarber, 
    userDeleteAppointment, 
    userGetAllAppointments, 
    userUpdateAppointment, 
    userUpdateAppointmentStatus 
} from '../controllers/appointments.controller.js';
import { createBarber, getBaberById, getBarbers, updateBarber } from '../controllers/barbers.controller.js';
import { getAllServicesController } from '../controllers/services.controller.js';

//ROUTER CONFIG
const router = Router();

//LOGIN, REGISTRATION, LOGOUT ROUTES 
router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);


//--------------------------------------------------------
//WORKINGHOUR ROUTES

//GET WORKING HOUR
router.get('/working-hours/:day', verifyToken, isAdmin, getWorkingHours);
//ADD NEW WORKING HOURS
router.post('/working-hours', verifyToken, isAdmin, addDayHours);

//------------------------------------------------------

//USER ROUTES

//GET ALL USERS
router.get('/users', verifyToken, isAdmin, getUsers);
//GET USER BY ID
router.get('/users/:id', verifyToken, getUserById);
//GET LOYALTY USERS
router.get('/users/loyalty', verifyToken, isAdmin, userGetLoyaltyUsers);
//UPDATE USERS BY ID
router.put('/users/:id', verifyToken, updateUserById);
//DELETE A USER BY ID
router.delete('/users/:id', verifyToken, isAdmin, getUsers);

//--------------------------------------------------------

//APPOINTMENT ROUTES

//GET ALL APPOINTMENTS
router.get('/appointments', verifyToken, isAdmin, userGetAllAppointments);
//GET THE ACTIVE USER APPOINTMENT
router.get('/appointments/me', verifyToken, getAppointmentByUser);
//GET APPOINTMENTS BY BARBER
router.get('/appointments/barber/:id', verifyToken, isAdmin, getAppointmentsByBarber);
//GET TOTAL APPOINTMENTS BY BARBER
router.get('/appointments/barber/total/:id', verifyToken, isAdmin, totalAppointmentsByBarber);
//CREATE APPOINTMENTS
router.post('/appointments', verifyToken, createAppointment);
//UPDATE APPOINTMENT
router.put('/appointments/:id', verifyToken, userUpdateAppointment);
//UPDATE APPOINTMENT STATUS
router.put('/appointments/:id/status', verifyToken, userUpdateAppointmentStatus);
//DELETE AN APPOINTMENT
router.delete('/appointments/:id', verifyToken, userDeleteAppointment);

//--------------------------------------------------------------

//BARBERS ROUTES
//GET ALL BARBERS
router.get('/barbers', verifyToken, getBarbers);
//GET BARBERS BY ID
router.get('/barbers/:id', verifyToken, isAdmin, getBaberById);
//CREATE NEW BARBERS
router.post('/barbers', verifyToken, isAdmin, createBarber);
//UPDATE BARBERS
router.put('/barbers', verifyToken, isAdmin, updateBarber);

//--------------------------------------------------------------

//AVAILABILITY ROUTES
//GET THE AVAILABLE SLOTS
router.get('/available-slots', verifyToken, getAvailability)

//--------------------------------------------------------------------

//SERVICES CONTROLLER 
router.get('/services', verifyToken, getAllServicesController);
//--------------------------------------------------------------------

//ROUTER EXPORTATION
export default router;