import { Request, Response } from "express";
import prisma from '../prisma';

export const getAllCategories = async (req: Request, res: Response) => {

    try {
        const getAllCategories = await prisma.category.findMany(
            {
                select: {
                    name: true
                }
            }
        );
        res.json(getAllCategories);

    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' })
    }
};
