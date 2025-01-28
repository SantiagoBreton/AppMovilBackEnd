import { Request, Response } from "express";
import prisma from '../prisma';

export const getAllRequestingUsersToAnEvent = async (req: Request, res: Response) => {
    const { eventId } = req.params;

    if (!eventId) {
        res.status(400).json({ error: 'Event ID is required' });
        return;
    }

    try {
        const getRequestingUsersToAnEvent = await prisma.eventPendingRequest.findMany({
            where: {
                eventId: Number(eventId),
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

        res.json(sanitizedUsers);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
};
