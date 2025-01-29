import { Request, Response } from "express";
import prisma from '../prisma';
import bcrypt from 'bcryptjs';

export const updateProfile = async (req: Request, res: Response) => {
    const { userId, newName, newPassword, newDescription } = req.query;

    try {
        if (!userId || !newName) {
            res.status(400).json({ error: 'userId y newName son necesarios' });
            return
        };

        const updateData: any = { name: newName };

        if (newPassword) {
            updateData.password = await bcrypt.hash(newPassword as string, 10);
        }

        if (newDescription) {
            updateData.description = newDescription;
        }

        const user = await prisma.user.update({
            where: { id: Number(userId) },
            data: updateData,
        });

        res.json(user);
    } catch (error) {
        console.error('Error al actualizar los datos del usuario:', error);
        res.status(500).json({ error: 'Fallo al actualizar los datos del usuario' });
    }
};
