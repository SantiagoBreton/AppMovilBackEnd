import { Request, Response } from "express";
import prisma from '../prisma';

export const subscribeToEvent = async (req: Request, res: Response) => {
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

    if (event.userId === userId) {
      res.status(400).json({ error: 'No puedes suscribirte a tu propio evento.' });
      return;
    }

    if (event.currentParticipants === event.maxParticipants) {
      res.status(400).json({ error: 'Que desgracia Amigo, este evento ya esta lleno' });
      return;
    }
    const eventUser = await prisma.eventPendingRequest.create({
      data: {
        userId,
        eventId,
      },
    });

    res.status(201).json(eventUser);
  } catch (error) {
    res.status(500).json({ error: 'No has podido suscribirte al evento, intentalo mas tarde.' });
  }
};



