import { Request, Response } from "express";
import prisma from '../prisma';

export const getEventByPartialName = async (req: Request, res: Response) => {
    const { currentUserId, name } = req.params;
    
    if (!name || !currentUserId) {
        res.status(400).json({ error: 'Faltan parametros para getEventByPartialName.' });
        return
    };

    try {
        const events = await prisma.event.findMany({
            where: {
                name: {
                    contains: name,
                    mode: "insensitive"
                },
                date: {
                    gte: new Date(),
                },
                userId: {
                    not: Number(currentUserId)
                }

            },
            include : {
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
}