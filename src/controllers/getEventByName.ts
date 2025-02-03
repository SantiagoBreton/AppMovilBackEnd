import { Request, Response } from "express";
import prisma from '../prisma';

export const getEventByPartialName = async (req: Request, res: Response) => {
    const { currentUserId, name } = req.params;
    
    if (!name || !currentUserId) {
        res.status(400).json({ error: 'Faltan parámetros para getEventByPartialName.' });
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
        events.forEach(event => {
            event.longitude = event.longitude+ event.latitudeOffset
            event.latitude = event.latitude+ event.longitudeOffset
        });
    
        res.json(events);
    } catch (error) {
        console.error('Error al cargar eventos:', error);
        res.status(500).json({ error: 'Fallo al cargar eventos' });
    }
}