import { getAvailableSlots } from "../services/availability.service.js";

//THIS CONTROLLER IS TO GET THE AVAILABLE SPACES AND CALL OTHER SERVICES
export const getAvailability = async (req, res) => {
    const { date } = req.query;

    if(!date) {
        return res.status(400).json({ message: 'Date is required' })
    }

    const slots = await getAvailableSlots(date);
    

    res.json({
        data: slots
    });
}