import { getAvailableSlots } from "../services/availability.service.js";

//THIS CONTROLLER IS TO GET THE AVAILABLE SPACES AND CALL OTHER SERVICES
export const getAvailability = async (req, res) => {
    try {
        const { date } = req.query;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
    
        if(!date) {
            return res.status(400).json({ message: 'Date is required' })
        }
    
        const result = await getAvailableSlots(date, limit, page);
        
    
        res.json({
            result
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: err.message
        })
    }
}