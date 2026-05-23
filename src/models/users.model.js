import pool from '../config/db.js';

//GET ALL USERS MODEL, IT RETURNS ALL THE USERS INTO THE DB TO USE IT IN THE CONTROLLERS
export const getAllUsers = async () => {
    const result = await pool.query(
        `
            SELECT id, name, email, role, phone FROM users WHERE role = 'user'
        `
    )

    return result.rows;
}


//CREATE NEW USER --> REGISTER
export const insertNewUser = async (  name, username, email, password, phone ) => {
    const result = await pool.query(
        `
            INSERT 
            INTO
            users
            ( username, name, email, password, phone ) 
            VALUES
            ( $1, $2, $3, $4, $5 )
            RETURNING *
        `, [ username, name, email, password, phone ]
    );
    return result.rows[0];
}

//GET USER BY ID
export const getUserByIdModel = async (id) => {
    const result = await pool.query(
        `
            SELECT 
            name, email, role, phone
            FROM
            users
            WHERE 
            id = $1
        `, [ id ]
    );
    
    return result.rows;
}



//GET USER BY IDENTITY(EMAIL OR USERNAME) ---> LOGIN 
export const getUserByIdentifier = async ( identifier ) => {
    const res = await pool.query(
        `
        SELECT 
        * 
        FROM 
        users 
        WHERE
        email = $1 OR username = $1
        `, [identifier]
    )

    return res.rows[0];
}


//UPDATE USERS MODEL
export const updateUser = async (name, username, email, role, phone, id) => {
    const result = await pool.query(
        `
            UPDATE
            users
            SET 
            name = $1,
            username = $2,
            email = $3,
            role = $4,
            phone = $5
            WHERE 
            id = $6
            RETURNING *
        `, [ name, username, email, role, phone, id ]
    );
    return result.rows[0];
} 



//DELETE USER MODEL
export const deleteUser = async (id) => {
    const res = await pool.query(
        `
            DELETE 
            FROM 
            users
            WHERE 
            id = $1
            RETURNING *
        `, [ id ]
    );

    return res.rows[0]
}


//GET LOYALTY USERS BY APPOINTMENTS AMOUNT
export const getLoyaltyUsers = async () => {
    const result = await pool.query(
        `
            SELECT 
            users.id AS user_id,
            users.name,
            COUNT(*) AS total_appointments
            FROM 
            appointments
            INNER JOIN 
            users
            ON 
            appointments.clientid = users.id
            GROUP BY users.id, users.name
            ORDER BY 
            total_appointments
            DESC
        `
    )
    return result.rows;
}
