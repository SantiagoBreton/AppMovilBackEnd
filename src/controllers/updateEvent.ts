import { Request, Response } from "express";
import prisma from '../prisma';

export const updateEvent = async (req: Request, res: Response) => {
    const { eventId, newName, newDescription, newDate,newTime } = req.params;

    if (!eventId || !newName || !newDescription || !newDate || !newTime) {
        res.status(400).json({ error: 'Faltan parámetros para updateEvent' });
        return
    };

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
                date: parsedDate.toISOString(),
                time: newTime
            },
        });

        res.json(event);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
};
