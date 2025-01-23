import { Request, Response } from "express";
import prisma from '../prisma';


export const createNewUserRating = async (req: Request, res: Response) => {
    const { ratingUserId, userId, comment, rating } = req.body;
    console.log(rating, userId);

    const newUserRating = await prisma.userRatingByUser.create({
        data: {
            comment,
            rating,
            user: { connect: { id: userId } },
            ratingUser: { connect: { id: ratingUserId } },
        },
    });

    // Calcular el promedio de todos los ratings del usuario
    const averageRating = await prisma.userRatingByUser.aggregate({
        where: { userId },
        _avg: { rating: true },
    });

    // Actualizar el campo `rating` del usuario
    await prisma.user.update({
        where: { id: userId },
        data: { rating: averageRating._avg.rating || 0 }, // Por defecto 0 si no hay ratings
    });


    res.json(newUserRating);
}