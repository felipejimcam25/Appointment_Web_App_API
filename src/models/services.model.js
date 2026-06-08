import pool from '../config/db.js';

export const getServices = async (service) => {
    const res = await pool.query(
        `
            SELECT
            *
            FROM
            services
            WHERE id = $1
        `, [ service ]
    );

    return res.rows[0];
} 

export const getAllServices = async () => {
    const res = await pool.query (
        `
            SELECT
            *
            FROM
            services
        `
    )

    return res.rows
}