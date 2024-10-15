import { Request, Response } from "express";
import prisma from '../prisma';


export const createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password,
        },
    })
    res.json(user);
}