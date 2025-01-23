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
        const userWithoutPassword = { id: user.id,name: user.name, email: user.email, rating:user.rating};

        res.json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ error: 'No se ha podido obtener la informacion del usuario, intentalo mas tarde.' });
    }
}