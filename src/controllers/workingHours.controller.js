import { getWorkingHoursByDay, insertWorkingSchedule } from "../models/workingHours.model.js"

export const getWorkingHours = async ( req, res ) => {
    try {
        const { day } = req.params;//this gets the day from url parameters
        
        const dayNumber = Number(day);//THIS CONVERS THE DAY PARAMETER TO A NUMBER

        //THIS ENSURES THAT THE DAY IS INVALID OR THERE IS NO A DAY
        if(!dayNumber || dayNumber < 0 || dayNumber > 6) {
            return res.status(400).json({
                message: 'You must select a day of the week, between 1-6'
            });
        }

        
        const schedule = await getWorkingHoursByDay(dayNumber);

        return res.status(200).json({
            message: 'All hours gotten successfully',
            data: schedule
        });

    } catch (err) {
        console.log(err);
        return res.status(400).json({ 
            message: 'Bad request'
        });
    }
}

export const addDayHours = async (req, res) => {
    try {
        const { day_of_week, start_time, end_time } = req.body;

        const schedule = await insertWorkingSchedule(day_of_week, start_time, end_time);

        if(!res) {
            return res.status(400).json({
                message: 'Bad Request'
            })
        }

        return res.status(201).json({
            message: 'Schedule added successfully',
            data: schedule
        });

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            message: 'Bad Request'
        });
    }
}