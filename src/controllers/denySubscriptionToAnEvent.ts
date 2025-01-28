import { Request, Response } from "express";
import prisma from '../prisma';

export const denySubscriptionToAnEvent = async (req: Request, res: Response) => {
  const { eventId,userId } = req.params;
  
  if (!eventId || !userId) {
    res.status(400).json({ error: 'Faltan parametros para denySubscriptionToAnEvent.' });
    return
    };

  try {
    if (!eventId || !userId) {
      res.status(400).json({ error: 'Faltan parametros.' });
      return;
    }
    const request = await prisma.eventPendingRequest.deleteMany({
        where: {
            userId: Number(userId),
            eventId: Number(eventId),
        },
    });
    

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: 'No has podido suscribirte al evento, intentalo ams tarde.' });
  }
};

