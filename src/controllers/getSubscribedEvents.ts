import { Request, Response } from "express";
import prisma from '../prisma';

export const getSubscribedEvents = async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (!userId) {
        res.status(400).json({ error: 'Faltan parámetros para getSubscribedEvents' });
        return
    };

    try {
        const getSubscribedEventsByUserId = await prisma.eventUser.findMany({
            where: {
                userId: Number(userId),
            },
        });
        const events = await prisma.event.findMany({
            where: {
                id: {
                    in: getSubscribedEventsByUserId.map(event => event.eventId)
                }
                
            },
            include: {
                category: {
                    select: {
                        name: true
                    }
                }
            }
        })

        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
};
