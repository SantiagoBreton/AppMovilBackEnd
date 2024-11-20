import { Request, Response } from "express";
import prisma from '../prisma';

export const updateEvent = async (req: Request, res: Response) => {
    const { eventId, newName, newDescription, newDate } = req.params; // Obtener el userId desde los parámetros de la ruta

    try {
        const parsedDate = new Date(newDate);

        if (isNaN(parsedDate.getTime())) {
            res.status(500).json({ error: 'Failed to fetch events' });
        }
        const event = await prisma.event.update({
            where: {
                id: Number(eventId),
            },
            data: {
                name: newName,
                description: newDescription,
                date: parsedDate.toISOString(), // Convert to ISO format
            },
        });

        res.json(event);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' }); // Manejar errores
    }
};
