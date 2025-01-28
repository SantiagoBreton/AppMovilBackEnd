import { Request, Response } from "express";
import prisma from '../prisma';
import bcrypt from 'bcryptjs';

export const updateProfile = async (req: Request, res: Response) => {
    const { userId, newName, newPassword, newDescription } = req.query;

    try {
        if (!userId || !newName) {
            res.status(400).json({ error: 'userId and newName are required' });
            return
        };

        const updateData: any = { name: newName };

        if (newPassword) {
            updateData.password = await bcrypt.hash(newPassword as string, 10);
        }

        // Only add description if it is provided
        if (newDescription) {
            updateData.description = newDescription;
        }

        const user = await prisma.user.update({
            where: { id: Number(userId) },
            data: updateData,
        });

        res.json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
};
