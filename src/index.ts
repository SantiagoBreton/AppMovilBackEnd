import express from 'express';
import userRouter from './routes/user';
import eventRouter from './routes/event';
import getEventsRouter from './routes/getEvents';
import getEventsByUserIdRouter from './routes/getEventsByUserId';
import deleteEventByIdRouter from './routes/deleteEventById';
import authRouter from './authRoutes/authRoutes';
import userLoginRouter from './routes/userLogin';
import subscribeToEventRouter from './routes/suscribeToAnEvent';
import userDataRouter from './routes/getUserData';
import prisma from './prisma';

const app = express();
app.use(express.json());
const port = 3000;

app.use('/auth', authRouter);
app.use('/', subscribeToEventRouter);
app.use('/', userLoginRouter);
app.use('/', userRouter);
app.use('/', eventRouter);
app.use('/', getEventsRouter);
app.use('/', getEventsByUserIdRouter);
app.use('/', deleteEventByIdRouter);
app.use('/', userDataRouter);

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