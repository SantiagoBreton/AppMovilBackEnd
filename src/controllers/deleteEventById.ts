import { Request, Response } from "express";
import prisma from '../prisma';

export const deleteEventById = async (req: Request, res: Response) => {
    const { eventId } = req.params;

    if (!eventId) {
        res.status(400).json({ error: 'Missing parameters.' });
        return
    };

    try {
        const events = await prisma.event.delete({
            where: {
                id: Number(eventId),
            },
        });

        res.json(events);
    } catch (error) {
        console.error('Error al cargar events:', error);
        res.status(500).json({ error: 'Fallo al cargar eventos' });
    }
};
