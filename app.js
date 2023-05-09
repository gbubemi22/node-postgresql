import "express-async-errors";
import * as dotenv from 'dotenv'
dotenv.config();
import express from 'express';
const app = express();





import path from 'path'
const currentFilePath = new URL(import.meta.url).pathname;
const currentDirPath = path.dirname(currentFilePath);






import cors from "cors";
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";
import rateLimiter from "express-rate-limit";
import helmet from "helmet";
import xss from "xss-clean";

// import routes
import AuthRouter from './router/authRouter.js';
import EliteRouter from './router/eliteRouter.js';
import EduInfo from './router/educationRouter.js';
import PartyRouter from './router/partyRouter.js';
import business from './router/businessRouter.js';

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser(process.env.JWT_COOKIE));
app.use(bodyParser.urlencoded({ extended: true }))




app.use(express.static(path.join(currentDirPath, "./public")));
app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req, res) => {
     res.json({ message: "Welcome to Elite App" });

});



// USE ROUTES

app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/users/', EliteRouter);
app.use('/api/v1/educations', EduInfo);
app.use('/api/v1/party', PartyRouter);
app.use('api/v1/business', business);


//ErrorHandlerMiddleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

app.set("trust proxy", 1);
app.use(
     rateLimiter({
          windowMs: 15 * 60 * 1000,
          max: 60,
     })
);
app.use(helmet());
app.use(xss());


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


//port
const port = process.env.PORT || 9000;

const start = async () => {
     try {
          
          console.log('Database initialized successfully');

          app.listen(port, async () => {


               console.log(`listing on port ${port}...`);

          });
     } catch (error) {
          console.log(error);
     }
};

start();
