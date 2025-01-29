import { Request, Response } from "express";
import prisma from '../prisma';

export const getPendingRequestedEvents = async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (!userId) {
        res.status(400).json({ error: 'Faltan parámetros para getPendingRequestedEvents' });
        return
    };

    try {
        const events = await prisma.eventPendingRequest.findMany({
            where: {
                userId: Number(userId)
            }
        });
        
        const eventsToReturn = await prisma.event.findMany({
            where: {
                id: {
                    in: events.map(event => event.eventId)
                },
                date: {
                    gte: new Date()
                }
            },
            include: {
                category: {
                    select: {
                        name: true
                    }
                }
            }
        });

        console.log(eventsToReturn);
        res.json(eventsToReturn);
    } catch (error) {
        res.status(500).json({ error: 'No se ha podido obtener la informacion de los eventos solicitados, intentalo mas tarde.' });
    }
}