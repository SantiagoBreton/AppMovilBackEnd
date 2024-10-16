import express from 'express';
import userRouter from './routes/user';
import eventRouter from './routes/event';
import getEventsRouter from './routes/getEvents';
import prisma from './prisma';

const app = express();
app.use(express.json());
const port = 3000;


app.use('/', userRouter);
app.use('/', eventRouter);
app.use('/', getEventsRouter);

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