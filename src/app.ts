import express from "express";
import bodyParser from "body-parser";
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import baseRouter from './routes/Index';
import webRouter from './routes/web'
/** parse the dot env and get the port */
dotenv.config({ path: __dirname+'/env/.env' })
const PORT  = process.env.PORT ?? 3000;
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',');
const app = express();
app.use(bodyParser.json());

// app.set('views', path.join(__dirname, 'dist', 'view'));
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'view')));

// Specify CORS options
const corsOptions = {
  origin: allowedOrigins,
  methods: 'GET,PUT,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204, // Send a 204 (No Content) status for preflight requests
};

app.use(cors(corsOptions));



app.use(webRouter); // the web route
app.use('/api',baseRouter); // this uses a base router all other router files extends the base router in thir definitions


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;