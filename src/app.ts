import express from "express";
import bodyParser from "body-parser";
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import baseRouter from './routes/Index';
import handleRedirect from "./utils/renderRedirectUrl";

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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'swagger.html'));
});

app.get('/:short_code', async (req, res)  => {
  return await handleRedirect(req, res);//point to the handler to redirect the user to the original url 
});


app.use('/api',baseRouter); // this uses a base router all other router files extends the base router in thir definitions


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;