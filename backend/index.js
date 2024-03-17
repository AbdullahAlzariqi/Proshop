import 'browser-env';
import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './Config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
const port = process.env.PORT || 5000;


connectDB(); //Connect to mongoDB 
const app = express();

app.get('/', (req, res) => {
    res.send('API is Running...')
})

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use(notFound);
app.use(errorHandler);



app.listen(port, () => console.log(`Server Running on Port ${port}`))