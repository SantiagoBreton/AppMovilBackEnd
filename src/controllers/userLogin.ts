import { Request, Response, RequestHandler } from 'express';
import bcrypt from 'bcryptjs';

import prisma from '../prisma';


export const userLogin: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            console.log('User not found');
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }

        console.log('User found:', user);

        let isPasswordValid = false;


        isPasswordValid = password === user.password || await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.log('Invalid password');
            console.log('Provided password:', password);
            console.log('Stored password:', user.password);
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }
        res.status(200).json({ 
            id:user.id
        })
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};