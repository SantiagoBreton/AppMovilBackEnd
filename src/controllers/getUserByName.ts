import { Request, Response } from "express";
import prisma from '../prisma';

export const getUserByPartialName = async (req: Request, res: Response) => {
    const { name } = req.params;

    if (!name) {
        res.status(400).json({ error: 'Faltan parámetros para getUserByPartialName' });
        return
    };

    try {
        const users = await prisma.user.findMany({
            where: {
                name: {
                    contains: name,
                    mode: "insensitive"
                },
            },
        });

        const sanitizedUsers = users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);

        res.json(sanitizedUsers);
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
        res.status(500).json({ error: 'Fallo al cargar usuarios' });
    }
}