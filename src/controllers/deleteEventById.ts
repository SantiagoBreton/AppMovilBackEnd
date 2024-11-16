import { Request, Response } from "express";
import prisma from '../prisma';

export const deleteEventById = async (req: Request, res: Response) => {
    const { eventId } = req.params; // Obtener el userId desde los parámetros de la ruta

    try {
        // Fetch events from the database, filtrando por userId
        const events = await prisma.event.delete({
            where: {
                id: Number(eventId), // Convertir eventId a número
            },
        });

        res.json(events); // Responder con los eventos en formato JSON
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' }); // Manejar errores
    }
};
