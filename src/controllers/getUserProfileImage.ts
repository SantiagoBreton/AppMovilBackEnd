import { Request, Response } from 'express';
import path from 'path';
import prisma from '../prisma';

export const getUserProfileImage = async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (!userId) {
        res.status(400).json({ error: 'Missing userId parameter' });
        return
    };

    try {
        const userProfileImage = await prisma.userProfileImage.findMany({
            where: { userId: Number(userId) },
        });

        if (!userProfileImage || userProfileImage.length === 0) {
            return ;
        }

        const imagePath = userProfileImage[0].imageUrl;

        const imageUrl = `http://${req.headers.host}/uploads/${path.basename(imagePath)}`;
        res.status(200).json({ imageUrl });

    } catch (error) {
        console.error('Error fetching user profile image:', error);
        res.status(500).json({ error: 'Failed to get user profile image, please try again later.' });
    }
};
