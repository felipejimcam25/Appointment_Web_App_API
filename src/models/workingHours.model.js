import pool from '../config/db.js'


//THIS ENDPOINT GET THE WEEK SCHEDULE, THIS IS TO AVOID PROBLEMS WITH OVERSCHEDULE APPOINTMENTS
export const getWorkingHoursByDay = async (dayOfWeek) => {
    const result = await pool.query(
        `
        SELECT start_time, end_time
        FROM working_hours
        WHERE day_of_week = $1
        `, [dayOfWeek]
    );
    return result.rows[0];
} 


//THIS FUNCTION IS TO INSERT THE SCHEDULE INSIDE THE DB
export const insertWorkingSchedule = async (weekDay, start_time, end_time) => {
    const result = await pool.query(
        `
        INSERT 
        INTO
        working_hours
        ( day_of_week, start_time, end_time )
        VALUES
        ( $1, $2, $3 )
        RETURNING *
        `, [weekDay, start_time, end_time]
    );
    return result.rows[0]
}

