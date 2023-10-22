import { Router } from 'express';
import usersRouter from './User'
import profileRouter from './Profile'
import shorthenRouter from './Shorthen'

const baseRouter = Router();


baseRouter.get('', (req, res) => {
    res.send('Welcome to the base route!');
});


baseRouter.use('/auth',usersRouter);
baseRouter.use('/profile',profileRouter);
baseRouter.use('/shorthen',shorthenRouter);
baseRouter.use('/analytics',shorthenRouter);
export default baseRouter;

