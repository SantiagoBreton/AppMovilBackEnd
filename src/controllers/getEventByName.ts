import { Request, Response } from "express";
import prisma from '../prisma';

export const getEventByPartialName = async (req: Request, res: Response) => {
    const { name } = req.params; // Obtener el nombre desde los parámetros de la ruta

    try {
        // Fetch events from the database, filtrando por nombre
        const events = await prisma.event.findMany({
            where: {
                name: {
                    contains: name, // Filtrar por eventos que contengan el nombre
                    mode: "insensitive"
                },
            },
        });
        res.json(events); // Responder con los eventos en formato JSON
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' }); // Manejar errores
    }
}