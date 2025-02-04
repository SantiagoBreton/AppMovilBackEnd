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
import getSubscribedEventsRouter from './routes/getSubscribedEvents';
import getEventByPartialNameRouter from './routes/getEventByName';
import { getUserByPartialName } from './controllers/getUserByName';
import getAllUsersSubscribedToAnEventRouter from './routes/getAllUsersSubscribedToAnEvent';
import unsubscribeUserFromEventRouter from './routes/unsubscribeUserFromEvent';
import getUserRatingRouter from './routes/getUserRating';
import createNewUserRatingRouter from './routes/createNewRating';
import confirmSubscriptionToAnEventRouter from './routes/confirmSubscriptionToAnEvent';
import getAllRequestingUsersToAnEventRouter from './routes/getAllRequestingUsersToAnEvent';
import denySubscriptionToAnEventRouter from './routes/denySubscriptionToAnEvent';
import updateEventRouter from './routes/updateEvent';
import getUserProfileImageRouter from './routes/getUserProfileImage';
import uploadUserProfileImageRouter from './routes/uploadUserProfileImage';
import uploadUserBannerRouter from './routes/uploadUserBanner';
import getUserBannerImageRouter from './routes/getUserBannerImage';
import updateProfileRouter from './routes/updateProfile';
import getHostInfoByEventIdRouter from './routes/getHostInfoByEventId';
import getAllCategoriesRouter from './routes/getAllCategories';
import getPendingRequestedEventsRouter from './routes/getPendingRequestedEvents';

const app = express();
app.use(express.json());
const port = 3000;




app.use('/auth', authRouter);
app.use('/', updateEventRouter);
app.use('/', updateProfileRouter);
app.use('/', unsubscribeUserFromEventRouter);
app.use('/', getAllUsersSubscribedToAnEventRouter);
app.use('/', getSubscribedEventsRouter);
app.use('/', subscribeToEventRouter);
app.use('/', userLoginRouter);
app.use('/', userRouter);
app.use('/', eventRouter);
app.use('/', getEventsRouter);
app.use('/', getEventsByUserIdRouter);
app.use('/', deleteEventByIdRouter);
app.use('/', userDataRouter);
app.use('/', getEventByPartialNameRouter);
app.use('/', getUserRatingRouter);
app.use('/', createNewUserRatingRouter);
app.use('/', confirmSubscriptionToAnEventRouter);
app.use('/', getAllRequestingUsersToAnEventRouter);
app.use('/', denySubscriptionToAnEventRouter);
app.use('/', getUserProfileImageRouter);
app.use('/', uploadUserProfileImageRouter);
app.use('/', uploadUserBannerRouter);
app.use('/', getUserBannerImageRouter);
app.get('/getUserByPartialName/:name', getUserByPartialName);
app.use('/', getHostInfoByEventIdRouter);
app.use('/', getAllCategoriesRouter);
app.use('/', getPendingRequestedEventsRouter);

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