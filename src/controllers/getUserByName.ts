import { Request, Response } from "express";
import prisma from '../prisma';

export const getUserByPartialName = async (req: Request, res: Response) => {
    const { name } = req.params;

    if (!name) {
        res.status(400).json({ error: 'Faltan parámetros para getUserByPartialName' });
        return
    };

    try {
        const events = await prisma.user.findMany({
            where: {
                name: {
                    contains: name,
                    mode: "insensitive"
                },
            },
        });
        res.json(events);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}