import { Request, Response } from "express";
import prisma from '../prisma';

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password,rating } = req.body;
    
    if (!name || !email || !password || !rating) {
        res.status(400).json({ error: 'Faltan parámetros para createUser' });
        return
    };
    
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password,
            rating
        },
    })

    await prisma.userProfileImage.create({
        data: {
            imageUrl: 'defaultUserImage.jpg',
            userId: user.id
        }
    })

    await prisma.userBannerImage.create({
        data: {
            imageUrl: 'defaultBannerImage.jpg',
            userId: user.id
        }
    })
    
    res.json(user);
}