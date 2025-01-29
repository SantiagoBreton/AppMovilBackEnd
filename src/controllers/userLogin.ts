import { Request, Response, RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../prisma';

export const userLogin: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: 'Falta el mail o la contraseña' });
        return
    };

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            console.log('Usuario no encontrado');
            res.status(401).json({ error: 'Mail o contraseña inválidos' });
            return;
        }

        let isPasswordValid = false;
        isPasswordValid = password === user.password || await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ error: 'Mail o contraseña inválidos' });
            return;
        }
        res.status(200).json({ 
            id:user.id
        })
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Falló el inicio de sesión' });
    }
};