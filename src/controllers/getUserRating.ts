import { Request, Response } from "express";
import prisma from '../prisma';

export const getUserRating = async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (!userId) {
        res.status(400).json({ error: 'Faltan parámetros para getUserRating' });
        return
    };

    try {
        const allRatings = await prisma.userRatingByUser.findMany({
            where: {
                userId: parseInt(userId)
            },
            include: {
                ratingUser: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        rating: true,
                        description: true
                    }
                }
            }

        });
        res.json(allRatings);
    } catch (error) {
        console.error('Error fetching ratings:', error);
        res.status(500).json({ error: 'Failed to fetch ratings' });
    }



}