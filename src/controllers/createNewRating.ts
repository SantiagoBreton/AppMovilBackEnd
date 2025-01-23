import { Request, Response } from "express";
import prisma from '../prisma';

export const createNewUserRating = async (req: Request, res: Response) => {
    const { ratingUserId, userId, comment, rating } = req.body;

    // Check if the user has already rated this user
    const existingRating = await prisma.userRatingByUser.findFirst({
        where: {
            ratingUserId,
            userId,
        },
    });

    // If a rating exists, delete the previous rating
    if (existingRating) {
        await prisma.userRatingByUser.delete({
            where: { id: existingRating.id },
        });
    }

    // Create the new rating
    const newUserRating = await prisma.userRatingByUser.create({
        data: {
            comment,
            rating,
            user: { connect: { id: userId } },
            ratingUser: { connect: { id: ratingUserId } },
        },
    });

    // Calculate the average rating of the user
    const averageRating = await prisma.userRatingByUser.aggregate({
        where: { userId },
        _avg: { rating: true },
    });

    // Update the user's rating field
    await prisma.user.update({
        where: { id: userId },
        data: { rating: averageRating._avg.rating || 0 }, // Default to 0 if no ratings
    });

    res.json(newUserRating);
};