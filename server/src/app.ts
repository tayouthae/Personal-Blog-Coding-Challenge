import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import blogRoutes from './routes/blog.routes';
import * as dotenv from 'dotenv';

dotenv.config();

const router = express();

/** Server Handling */
const httpServer = http.createServer(router);

/** Connect to Mongo */
const dbUrl = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
mongoose
  .connect(dbUrl, {})
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.log('Database connection error:', err.message);
  });

/** Parse the body of the request */
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

/** Rules of our API */
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

/** Routes */
router.use('/', blogRoutes);

/** Error handling */
router.use((req, res, next) => {
  const error = new Error('Not found');

  res.status(404).json({
    message: error.message,
  });
});

/** Listen */
httpServer.listen(process.env.APP_PORT, () => {
  console.log('Listened from port', process.env.APP_PORT);
});
