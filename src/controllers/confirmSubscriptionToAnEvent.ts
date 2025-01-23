import { Request, Response } from "express";
import prisma from '../prisma';

export const confirmSubscriptionToAnEvent = async (req: Request, res: Response) => {
  const { userId, eventId } = req.body;
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });
    
    if (!event) {
      res.status(404).json({ error: 'Event not found.' });
      return;
    }

    const eventUser = await prisma.eventUser.create({
      data: {
        userId,
        eventId,
      },
    });

    await prisma.eventPendingRequest.deleteMany({
        where: {
            userId,
            eventId,
        },
    });

    const updateEventParticipants = await prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        currentParticipants: {
          increment: 1,
        },
      },
    });

    res.status(201).json(eventUser);
  } catch (error) {
    res.status(500).json({ error: 'No has podido suscribirte al evento, intentalo ams tarde.' });
  }
};

