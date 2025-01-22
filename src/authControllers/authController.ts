import { Request, Response, RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';

const secret = 'your_jwt_secret'; // Use a secure secret in production

export const register = async (req: Request, res: Response) => {
    const { email, name, password,rating } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                rating

            },
        });
        console.log('User registered:', user);
        res.status(201).json(user);
    } catch (error) {
        console.error('User registration error:', error);
        res.status(500).json({ error: 'User registration failed' });
    }
};

export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
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

        // // Check if the password is hashed
        // if (user.password.startsWith('$2a$')) {
        //     // Compare hashed password
        //     isPasswordValid = await bcrypt.compare(password, user.password);
        // } else {
        //     // Compare plain text password
        //     isPasswordValid = password === user.password;
        // }


        isPasswordValid = password === user.password || await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.log('Invalid password');
            console.log('Provided password:', password);
            console.log('Stored password:', user.password);
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }

        const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};