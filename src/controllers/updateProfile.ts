import { Request, Response } from "express";
import prisma from '../prisma';
import bcrypt from 'bcryptjs';

export const updateProfile = async (req: Request, res: Response) => {
    const { userId, newName, newPassword, newDescription } = req.params;

    if (!userId || !newName || !newPassword || !newDescription) {
        res.status(400).json({ error: 'Faltan parámetros para updateProfile' });
        return
    };

    if (newPassword != '') {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        try {
            const user = await prisma.user.update({
                where: {
                    id: Number(userId),
                },
                data: {
                    name: newName,
                    password: hashedPassword,
                    description: newDescription
                }
            });

            res.json(user);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ error: 'Failed to fetch user' }); // Manejar errores
        }
    } else {
        try {
            const user = await prisma.user.update({
                where: {
                    id: Number(userId),
                },
                data: {
                    name: newName,
                    description: newDescription
                }
            });

            res.json(user);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ error: 'Failed to fetch user' }); // Manejar errores
        }
    }};
