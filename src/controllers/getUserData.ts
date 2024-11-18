import { Request, Response } from "express";
import prisma from '../prisma';

export const getUserData = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(userId),
            },
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