import pool from "../config/db.js";
//THIS MODEL GETS ALL THE APPOINTMENTS BY DATE FROM THE DATABASE
export const getAppointmentByDate = async (date) => {
    const result = await pool.query(
        `
            SELECT start_time, end_time
            From appointments
            WHERE date = $1
        `, [date]
    )

    return result.rows;
}

//COUNT THE NUMBER OF APPOINTMENTS PER DAY
export const countAppointmentByDate = async (date) => {
    const result = await pool.query(
        `
        SELECT COUNT(*) AS "totalAppointments"
        FROM appointments
        WHERE date = $1
        `, [ date ]
    )
    return Number(result.rows[0].totalAppointments);
}

//MODEL TO INSERT A NEW APPOINTMENT TO THE DATABASE
export const insertAppointment = async ( date, start, end, service, barber, client ) => {
    const res = await pool.query(
        `
            INSERT
            INTO 
            appointments
            (clientid, barberid, date, serviceid, start_time, end_time)
            VALUES 
            ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `, [ client, barber, date, service, start, end ]
    );

    return res.rows[0];
}

//ENDPOINT TO CHECK AVAILABLE SLOTS, IT CHECKS IF THE THIS DAY AND HOUR IS OCCUPIED
export const checkConflict = async(date, barber, start, end) => {
    const res = await pool.query(
        `
            SELECT
            *
            FROM
            appointments
            WHERE
            date = $1 
            AND
            barberid = $2
            AND
            start_time < $3
            AND
            end_time > $4
        `, [ date, barber, end, start ]
    );
    return res.rows.length > 0;
}

//MODEL TO UPDATE AN APPOINTMENT
export const updateAppointment = async (id, date, start, end, service, barber, client ) => {
    
    const res = await pool.query(
        `
            UPDATE 
            appointments
            SET
            clientid = $1,
            barberid = $2,
            date = $3,
            serviceid = $4,
            start_time = $5,
            end_time = $6
            WHERE 
            id = $7
            RETURNING *
        `, [ client, barber, date, service, start, end, id ]
    )

    return res.rows[0];
}

//MODEL TO DELETE AN APPOINTMENT
export const deleteAppointment = async (id) => {

    const res = await pool.query(
        `
            DELETE
            FROM
            appointments
            WHERE
            id = $1
            RETURNING *
        `, [ id ]
    );
    return res.rows;

}


//GET APPPOINTMENT BY ID
export const getAppointmentById = async (id) => {
    const res = await pool.query(
        `
            SELECT 
            appointments.id AS appointment_id,
            appointments.clientid,
            appointments.date,
            appointments.serviceid,
            appointments.start_time,
            appointments.end_time,
            barbers.name AS barber_name,
            services.name AS service_name
        FROM appointments
        INNER JOIN barbers
            ON appointments.barberid = barbers.id
        INNER JOIN services
            ON appointments.serviceid = services.id
        WHERE appointments.clientid = $1
        ORDER BY appointments.date DESC, appointments.start_time DESC
        LIMIT 1;
        `, [ id ]
    );

    return res.rows[0];
}


//GET ALL APPOINTMENTS WITH USERS (ADMIN PATH) MODEL
export const getAllAppointments = async () => {
    const res = await pool.query(
        `
        SELECT 
        appointments.id AS appointment_id
        appointments.clientid AS client,
        appointments.barberid AS barber,
        appointments.date AS date,
        appointments.serviceid AS service,
        appointments.start_time AS start,
        appointments.end_time AS end,
        users.name AS name,
        users.phone AS phone,
        services.name AS service_name,
        barbers.name AS barber

        FROM appointments

        INNER JOIN users
        ON appointments.clientid = users.id

        INNER JOIN services
        ON appointments.serviceid = services.id

        INNER JOIN barbers
        ON appointments.barberid = barbers.id

        ORDER BY appointments.start_time DESC
        `
    )

    return res.rows;
}

//MODEL TO UPDATE THE APPOINTMENT STATUS
export const updateAppointmentStatus = async (id, status) => {
    const result = await pool.query(
        `
            UPDATE 
            appointments
            SET
            status = $1
            WHERE 
            id = $2
            RETURNING *
        `, [ status, id ]
    )

    return result.rows[0];
}

//GET APOINTMENTS BY BABER
export const getAppointmentsByBarberModel = async (id) => {
    const result = await pool.query(
        `
            SELECT
            appointments.clientid AS client,
            appointments.barberid AS barber_id,
            appointments.date AS date,
            appointments.start_time AS start,
            appointments.end_time AS end,
            appointments.status AS status,
            barbers.name AS barber
            FROM 
            appointments

            INNER JOIN barbers
            ON appointments.barberid = barbers.id

            INNER JOIN users
            ON appointments.clientid = users.id

            INNER JOIN services
            ON appointments.serviceid = services.id

            WHERE appointments.barberid = $1
            
            ORDER BY appointments.start_time DESC

        `, [ id ]
    );

    return result.rows;
}



//GET TOTAL APPOINTMENTS BY DAY PER BARBER
export const getTotalAppointmentsByBarberModel = async (id) => {
    const result = await pool.query(
        `
        SELECT
        date,
        COUNT(*) AS total_appointments
        FROM 
        appointments
        WHERE
        barberid = $1
        GROUP BY date
        ORDER BY date
        `, [ id ]
    );

    return result.rows;
}