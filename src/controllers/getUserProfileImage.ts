import { Request, Response } from 'express';
import path from 'path';
import prisma from '../prisma';

export const getUserProfileImage = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const userProfileImage = await prisma.userProfileImage.findMany({
            where: { userId: Number(userId) },
        });

        if (!userProfileImage || userProfileImage.length === 0) {
            return ;
        }

        const imagePath = userProfileImage[0].imageUrl;

        // If you want to send the file directly:
        // const absolutePath = path.resolve(imagePath);
        // res.sendFile(absolutePath);

        // Otherwise, send the URL for the frontend to fetch:
        const imageUrl = `http://${req.headers.host}/uploads/${path.basename(imagePath)}`;
        res.status(200).json({ imageUrl }); // Return the image URL
    } catch (error) {
        console.error('Error fetching user profile image:', error);
        res.status(500).json({ error: 'Failed to get user profile image, please try again later.' });
    }
};
