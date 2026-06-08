import { getAllServices } from "../models/services.model.js"

export const getServicesService = async () => {
    const services = await getAllServices();

    if(!services) throw new Error('Error getting Services');

    return services;
}