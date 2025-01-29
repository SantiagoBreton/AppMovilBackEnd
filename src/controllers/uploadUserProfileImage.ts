import { Request, Response } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import prisma from '../prisma'; 

const uploadsPath = path.resolve(__dirname, '../../uploads');

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../../uploads')); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });

export const uploadUserProfileImage = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const { userId } = req.body; 

    if (!file) {
      return res.status(400).send({ error: 'No has subido ningun archivo' });
    }

    const UpdateUserProfileImage = await prisma.userProfileImage.updateMany({
      where: {
        userId: parseInt(userId, 10),
      },
      data: {
        imageUrl: file.originalname,
      },
    });

    if (!UpdateUserProfileImage) {
      console.error('Error al guardar la imagen en la base de datos:', UpdateUserProfileImage);
      return res.status(500).send({ error: 'Fallo al guardar la imagen en la base de datos.' });
    }

    return res.status(200).send({ message: 'Archivo subido correctamente', file });
    
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    return res.status(500).send({ error: 'Error interno del servidor' });
  }
};
