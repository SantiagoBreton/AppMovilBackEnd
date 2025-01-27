import { Request, Response } from "express";
import prisma from '../prisma';

export const getEventsByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params; // Obtener el userId desde los parámetros de la ruta

    try {
        // Fetch events from the database, filtrando por userId
        const events = await prisma.event.findMany({
            where: {
                userId: Number(userId), // Convertir userId a número
            },
            include: { 
                category: {
                    select: {
                        name: true
                    }
                }
            }
        });

        res.json(events); // Responder con los eventos en formato JSON
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' }); // Manejar errores
    }
};
