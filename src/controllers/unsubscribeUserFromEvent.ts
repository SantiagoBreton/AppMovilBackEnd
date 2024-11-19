import { Request, Response } from "express";
import prisma from '../prisma';

export const unsubscribeUserFromEvent = async (req: Request, res: Response) => {
    const { userId, eventId } = req.params; // Obtener el userId desde los parámetros de la ruta

    try {
        // Fetch events from the database, filtrando por userId
        const userEvents = await prisma.eventUser.delete({
            where: {
                userId_eventId: {
                    userId: Number(userId), // Convertir userId a número
                    eventId: Number(eventId), // Convertir eventId a número
                }
            }
        });
        const events = await prisma.event.update({
            where: {
                id: Number(eventId)
            },
            data: {
                currentParticipants: {
                    decrement: 1
                }
            }
        });

        res.json(userEvents); // Responder con los eventos en formato JSON
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' }); // Manejar errores
    }
};
