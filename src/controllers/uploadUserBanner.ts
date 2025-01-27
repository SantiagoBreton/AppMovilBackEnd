import { Request, Response } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import prisma from '../prisma'; // Adjust the path to your Prisma instance

// Configure Multer storage
const uploadsPath = path.resolve(__dirname, '../../uploads');

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true }); // Create 'uploads' folder if it doesn't exist
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../../uploads')); // Save files to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name
  },
});

export const upload = multer({ storage });

// Controller to handle the file upload
export const uploadUserBanner = async (req: Request, res: Response) => {
  try {
    const file = req.file; // The uploaded file
    const { userId } = req.body; // The userId sent from the frontend

    if (!file) {
      return res.status(400).send({ error: 'No file uploaded' });
    }

    // Update the user's profile image in the database
    const UpdateUserProfileImage = await prisma.userBannerImage.updateMany({
      where: {
        userId: parseInt(userId, 10),
      },
      data: {
        imageUrl: file.originalname,
      },
    });

    if (!UpdateUserProfileImage) {
      console.error('Error saving image to database:', UpdateUserProfileImage);
      return res.status(500).send({ error: 'Failed to save image to the database.' });
    }

    console.log('Image saved to database:', UpdateUserProfileImage);
    return res.status(200).send({ message: 'File uploaded successfully', file });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};
