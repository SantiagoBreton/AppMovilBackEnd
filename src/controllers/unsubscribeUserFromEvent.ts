import { Request, Response } from "express";
import prisma from '../prisma';

export const unsubscribeUserFromEvent = async (req: Request, res: Response) => {
    const { userId, eventId } = req.params;

    if (!userId || !eventId) {
        res.status(400).json({ error: 'Faltan parámetros para unsubscribeUserFromEvent' });
        return
    };

    try {
        const existingEvent = await prisma.eventUser.findUnique({
            where: {
                userId_eventId: {
                    userId: Number(userId),
                    eventId: Number(eventId),
                }
            }
        });

        if (!existingEvent) {
            const pendingUserEvents = await prisma.eventPendingRequest.delete({
                where: {
                    userId_eventId: {
                        userId: Number(userId),
                        eventId: Number(eventId),
                    }
                }
            });
            res.json(pendingUserEvents);
        }else{
            const userEvents = await prisma.eventUser.delete({
                where: {
                    userId_eventId: {
                        userId: Number(userId),
                        eventId: Number(eventId),
                    }
                }
            });
            
            await prisma.event.update({
                where: {
                    id: Number(eventId)
                },
                data: {
                    currentParticipants: {
                        decrement: 1
                    }
                }
            });
            res.json(userEvents);
        }

    } catch (error) {
        console.error('Error al cargar eventos:', error);
        res.status(500).json({ error: 'Fallo al cargar events' });
    }
};
