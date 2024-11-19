import { Request, Response } from "express";
import prisma from '../prisma';

export const updateEventDate = async (req: Request, res: Response) => {
    const { eventId, newDate } = req.params; // Obtener el userId desde los parámetros de la ruta

    try {
        const event= await prisma.event.update({
            where: {
                id: Number(eventId)
            },
            data: {
                date: newDate
            }
        });

        res.json(event); // Responder con los eventos en formato JSON
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' }); // Manejar errores
    }
};
