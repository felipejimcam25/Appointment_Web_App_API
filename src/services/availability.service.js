import { addMinutes } from "../utils/duration.js";

import { getWorkingHoursByDay } from "../models/workingHours.model.js"

import { countAppointmentByDate, getAppointmentByDate } from "../models/appointment.model.js";


//THIS FUNCTION GENERATE AVAILABILITY SLOTS
const generateSlots = (start, end, duration = 60) => {//HERE THE FUNCTION GETS START TO SET THE START HOUR, END TO SET THE END HOUR AND DURATION TO SET THE DURATION OF THE EACH SLOT
    const slots = [];//THIS ARRAY SAVE ALL THE GENERATED AVAILABLE SPACES 

    let current = start.slice(0, 5);//THIS VARIABLE TAKES THE START HOUR AND ENSURE THE FORMAT JUST IN HH:MM

    const endTime = end.slice(0, 5);//SAME AS PREVIOUS BUT WITH THE END HOUR
    //WHILE THE CURRENT HOUR IS LESS THAN THE END HOUR KEEP GENERATING SLOTS
    while (current < endTime) {
        const next = addMinutes(current, duration);//THIS CALCULATES THE NEXT SCHEDULE ADDING THE DURATION

        if(next > endTime) break;//IF THE NEXT SLOT IS MORE THAN THE ENDTIME BREAKS THE LOOP

        slots.push({//THIS PART ADD THE NEW SLOT TO THE ARRAY
            start: current,
            end: next
        });
        current = next;//advance the current time to the next slot
    }

    return slots;//RETURN ALL THE GENERATED SLOTS 
}

//THIS FUNCTION GETS THE AVAILABLE SLOTS
export const getAvailableSlots = async (date, limit, offset) => {//GETS THE DATE AS A PARAMETER
    const day = new Date(date + "T12:00:00").getDay();//THIS PART GETS THE DAY OF THE WEEK, THIS IS IMPORTANT TO KNOW THE SCHEDULE ACCORDING TO THE WORK DAYS
    
    const workingHours = await getWorkingHoursByDay(day);//THIS GETS THE WORK SCHEDULE

    if(!workingHours) return [];//IF THE WORKING HOURS RESPONSE WAS NULL OR FALSE STOPS THE FUNCTION AND RETURN A EMPTY ARRAY

    const appointment = await getAppointmentByDate(date, limit, offset);//THIS GETS ALL THE DAILY APPOINTMENTS 

    //COUNT ALL THE APPOINTEMENTS
    const totalAppointments = await countAppointmentByDate(date);

    //THIS GENERATES ALL THE POSSIBLE SLOTS, THIS CREATES ALL THE SPACES
    const slots = generateSlots(
        workingHours.start_time,
        workingHours.end_time
    )

    //THIS PART FILTERS AVAILABLE SPACES AND DELETE THOSE THAT ARE OCCUPIED
    const available = slots.filter(slot => {
        return !appointment.some(a => {
            return (
                slot.start < a.end_time && slot.end > a.start_time
            )
        })
    })
    
    return {
        totalAppointments,
        available
    }//RETURNS AVAILABLE SPACES
}