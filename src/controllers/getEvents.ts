import { Request, Response } from "express";
import prisma from '../prisma';


export const getEvents = async (req: Request, res: Response) => {
    try {
        const events = await prisma.event.findMany({
            include: { 
                category: {
                    select: {
                        name: true
                    }
                }
            }
        }); // Fetch all events from the database
        res.json(events); // Respond with the events in JSON format
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' }); // Handle any errors
    }
}