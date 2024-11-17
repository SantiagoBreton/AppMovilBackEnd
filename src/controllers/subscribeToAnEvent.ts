import { Request, Response } from "express";
import prisma from '../prisma';

export const subscribeToEvent = async (req: Request, res: Response) => {
  const { userId, eventId } = req.body;
  try {
    const eventUser = await prisma.eventUser.create({
      data: {
        userId,
        eventId,
      },
    });

    res.status(201).json(eventUser);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while subscribing to the event.' });
  }
};



