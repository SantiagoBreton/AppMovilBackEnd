import { Request, Response } from "express";
import prisma from '../prisma';


export const createNewUserRating = async (req: Request, res: Response) => {
    const { ratingUserId, userId,comment ,rating } = req.body;
    console.log(rating, userId);
    
    const newUserRating = await prisma.userRatingByUser.create({
        data: {
            ratingUserId,
            userId,
            comment,
            rating,
    
        },
    })
    res.json(newUserRating);
}