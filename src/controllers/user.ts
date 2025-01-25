import { Request, Response } from "express";
import prisma from '../prisma';


export const createUser = async (req: Request, res: Response) => {
    const { name, email, password,rating } = req.body;
    console.log(name, email, password);
    
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password,
            rating
        },
    })

    const userProfileImage = await prisma.userProfileImage.create({
        data: {
            imageUrl: 'defaultUserImage.jpg',
            userId: user.id
        }
    })

    const userBannerImage = await prisma.userBannereImage.create({
        data: {
            imageUrl: 'defaultBannerImage.jpg',
            userId: user.id
        }
    })
    console.log(userProfileImage);
    res.json(user);
}