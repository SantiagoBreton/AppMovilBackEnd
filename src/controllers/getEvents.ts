import { Request, Response } from "express";
import prisma from '../prisma';


export const getEvents = async (req: Request, res: Response) => {
    const { distanceRadius, userLatitude, userLongitude } = req.params;

    if (!distanceRadius || !userLatitude || !userLongitude) {
        res.status(400).json({ error: 'Faltan parámetros para getEvents' });
        return
    };

    try {
        const getBoundingBox = (
            lat: number,
            lon: number,
            distanceKm: number
        ): { minLat: number; maxLat: number; minLon: number; maxLon: number } => {
            const R = 6371;
            const deg2rad = (deg: number): number => deg * (Math.PI / 180);
            const rad2deg = (rad: number): number => rad * (180 / Math.PI);

            const latDistance = distanceKm / R;
            const minLat = lat - rad2deg(latDistance);
            const maxLat = lat + rad2deg(latDistance);

            const lonDistance = distanceKm / (R * Math.cos(deg2rad(lat)));
            const minLon = lon - rad2deg(lonDistance);
            const maxLon = lon + rad2deg(lonDistance);

            return { minLat, maxLat, minLon, maxLon };
        };

        const { minLat, maxLat, minLon, maxLon } = getBoundingBox(
            Number(userLatitude),
            Number(userLongitude),
            Number(distanceRadius));

        
        const events = await prisma.event.findMany({
            where: {
                latitude: {
                    gte: minLat,
                    lte: maxLat
                },
                longitude: {
                    gte: minLon,
                    lte: maxLon
                }
            },
            include: {
                category: {
                    select: {
                        name: true
                    }
                }
            }
        });
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
}