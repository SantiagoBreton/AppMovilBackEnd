import { Request, Response } from "express";
import prisma from '../prisma';

export const createNewUserRating = async (req: Request, res: Response) => {
    const { ratingUserId, userId, comment, rating } = req.body;

    if (!ratingUserId || !userId || !rating) {
        res.status(400).json({ error: 'Missing parameters.' });
        return;
    }

    const existingRating = await prisma.userRatingByUser.findFirst({
        where: {
            ratingUserId,
            userId,
        },
    });

    if (existingRating) {
        await prisma.userRatingByUser.delete({
            where: { id: existingRating.id },
        });
    }

    const newUserRating = await prisma.userRatingByUser.create({
        data: {
            comment,
            rating,
            user: { connect: { id: userId } },
            ratingUser: { connect: { id: ratingUserId } },
        },
    });

    const averageRating = await prisma.userRatingByUser.aggregate({
        where: { userId },
        _avg: { rating: true },
    });

    await prisma.user.update({
        where: { id: userId },
        data: { rating: averageRating._avg.rating || 0 },
    });

    res.json(newUserRating);
};