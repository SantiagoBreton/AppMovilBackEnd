import { Request, Response } from "express";
import prisma from '../prisma';

export const getAllRequestingUsersToAnEvent = async (req: Request, res: Response) => {
    const { eventId } = req.params; // Obtener el userId desde los parámetros de la ruta

    try {
        // Fetch events from the database, filtrando por userId
        const getRequestingUsersToAnEvent = await prisma.eventPendingRequest.findMany({
            where: {
                eventId: Number(eventId), // Convertir userId a número
            },
        });
        const users = await prisma.user.findMany({
            where: {
                id: {
                    in: getRequestingUsersToAnEvent.map(user => user.userId)
                }
            }
        });
        const sanitizedUsers = users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);

        res.json(sanitizedUsers); // Responder con los datos sin contraseñas
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' }); // Manejar errores
    }
};
