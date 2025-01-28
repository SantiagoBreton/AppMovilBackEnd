import { Request, Response } from "express";
import prisma from '../prisma';

export const getEventsByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (!userId) {
        res.status(400).json({ error: 'Faltan parámetros para getEventsByUserId' });
        return
    };

    try {
        const events = await prisma.event.findMany({
            where: {
                userId: Number(userId),
            },
            include: { 
                category: {
                    select: {
                        name: true
                    }
                }
            }
        });

        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
};
