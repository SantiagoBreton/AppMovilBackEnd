import { Request, Response } from "express";
import prisma from '../prisma';


export const createEvent = async (req: Request, res: Response) => {
    const { name, date, latitude, longitude, description, maxParticipants,currentParticipants,rating,time, categoryName,userId } = req.body;
    
    const category = await prisma.category.findFirst({
        where: {
            name: categoryName
        }
    });
    
    if (!category) {
        return 
    }
    const categoryId = category.categoryId;

    const newEvent = await prisma.event.create({
        data: {
            name,
            date,
            latitude,
            longitude,
            latitudeOffset: (Math.random() - 0.5) * (500 / 111000),
            longitudeOffset: (Math.random() - 0.5) * (500 / 111000),
            description,
            maxParticipants,
            currentParticipants,
            rating,
            time,
            categoryId,
            userId
        },
    })
    res.json(newEvent);
}