import express from 'express';
import userRouter from './routes/user';
import prisma from './prisma';

const app = express();
app.use(express.json());
const port = 3000;


app.use('/', userRouter);


app.get('/', (_req, res) => {
    res.send('Hello World!!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit();
});