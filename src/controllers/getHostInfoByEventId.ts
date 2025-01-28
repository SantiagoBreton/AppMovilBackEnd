import { Request, Response } from "express";
import prisma from '../prisma';

export const getHostInfoByEventId = async (req: Request, res: Response) => {
    const { eventId } = req.params;

    if (!eventId) {
        res.status(400).json({ error: 'Faltan parámetros para getHostInfoByEventId' });
        return
    };

    try {
        const user = await prisma.event.findUnique({
            where: {
                id: Number(eventId),
            },
            select: {
                user: {
                    select: {
                        id: true,
                    }
                }
            }
        });
        if (!user) {
            res.status(404).json({ error: 'Usuario no encontrado.' });
            return;
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'No se ha podido obtener la informacion del usuario, intentalo mas tarde.' });
    }
}