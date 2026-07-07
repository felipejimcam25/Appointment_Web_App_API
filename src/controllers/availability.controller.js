import { getAvailableSlots } from "../services/availability.service.js";

//THIS CONTROLLER IS TO GET THE AVAILABLE SPACES AND CALL OTHER SERVICES
export const getAvailability = async (req, res) => {
    const { date } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    if(!date) {
        return res.status(400).json({ message: 'Date is required' })
    }

    const slots = await getAvailableSlots(date, limit, offset);
    

    res.json({
        data: slots
    });
}