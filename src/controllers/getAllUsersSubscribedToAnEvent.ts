import { Request, Response } from "express";
import prisma from '../prisma';

export const getAllUsersSubscribedToAnEvent = async (req: Request, res: Response) => {
    const { eventId } = req.params; // Obtener el userId desde los parámetros de la ruta

    try {
        // Fetch events from the database, filtrando por userId
        const getSubscribedUsersToAnEvent = await prisma.eventUser.findMany({
            where: {
                eventId: Number(eventId), // Convertir userId a número
            },
        });
        const users = await prisma.user.findMany({
            where: {
                id: {
                    in: getSubscribedUsersToAnEvent.map(user => user.userId)
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
