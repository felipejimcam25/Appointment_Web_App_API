import pool from '../config/db.js'

//GET ALL BARBERS
export const getAllBarbersModel = async () => {
    const result = await pool.query(
        `
            SELECT 
            *
            FROM
            barbers
        `
    );

    return result.rows;
}

//GET BARBERS BY ID
export const getBarberIdModel = async (id) => {
    const result = pool.query(
        `
        SELECT
        FROM 
        barbers
        WHERE
        id = $1
        `, [ id ]
    );

    return result.rows[0];
}

//INSERT NEW ADMIN-USER 
export const createAdminUser = async (name, email, password, phone) => {
    const result = await pool.query(
        `
            INSERT 
            INTO
            users
            (name, email, password, role, phone)
            VALUES
            ($1, $2, $3, $4, $5)
            RETURNING *
        `, [ name, email, password, 'admin', phone ]
    )
    return result.rows[0];
}


//INSERT BARBERS
export const insertBaberModel = async (user_id, name) => {
    const result = await pool.query(
        `
            INSERT
            INTO
            barbers
            (user_id, name) 
            VALUES
            ($1, $2)
            RETURNING *
        `, [user_id, name]
    );

    return result.rows[0];
}


//UPDATE BARBER 
export const updateBarberModel = async (name, id) => {
    const result = await pool.query(
        `
            UPDATE
            barbers
            SET
            name = $1
            WHERE
            id = $2
        `, [ name, id ]
    )

    return result.rows[0];
}

//DELETE BARBER MODEL

export const deleteBarberModel = async (id) => {
    const result = await pool.query(
        `
            DELETE
            FROM 
            barbers
            WHERE 
            id = $1
            RETURNING *
        `, [ id ]
    );

    return result.rows[0]
}