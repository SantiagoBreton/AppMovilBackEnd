import { Request, Response } from "express";
import prisma from '../prisma';


export const createEvent = async (req: Request, res: Response) => {
    const { name, date, latitude, longitude, description, maxParticipants,currentParticipants,userId } = req.body;
    console.log(name, date, latitude, longitude, description, maxParticipants,currentParticipants,userId);
    
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
            userId
        },
    })
    res.json(newEvent);
}