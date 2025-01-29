import { Request, Response } from "express";
import prisma from '../prisma';

export const getAllUsersSubscribedToAnEvent = async (req: Request, res: Response) => {
    const { eventId } = req.params;

    if (!eventId) {
        res.status(400).json({ error: 'Missing eventId' });
        return;
    }

    try {
        const getSubscribedUsersToAnEvent = await prisma.eventUser.findMany({
            where: {
                eventId: Number(eventId),
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

        res.json(sanitizedUsers);
    } catch (error) {
        console.error('Error al cargar eventos:', error);
        res.status(500).json({ error: 'Fallo al cargar eventos' });
    }
};
