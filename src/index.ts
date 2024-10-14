import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json());
const port = 3000;
export const prisma = new PrismaClient();

app.get('/', (_req, res) => {
    res.send('Hello World!!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});