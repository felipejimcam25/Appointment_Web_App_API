import { getServicesService } from "../services/services.service.js"

export const getAllServicesController = async (req, res) => {
    const services = await getServicesService();

    if(!services) {
        return res.status(400).json({
            'success': false,
            'message': 'Error getting services'
        });
    }

    return res.status(200).json({
        'success': true,
        'message': 'Services gotten successfully',
        'data': services
    })

}