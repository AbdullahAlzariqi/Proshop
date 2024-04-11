import 'browser-env';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './Config/db.js';
import stripe from 'stripe'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
const port = process.env.PORT || 5000;



connectDB(); //Connect to mongoDB 
const app = express();

// To parse request bodies 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Stripe Configuration 
const stripeConfig = stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-08-01"
})

//cookie parser
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('API is Running...')
})



app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.get("/api/config", (req, res) => {
    res.send({
        pubishableKey: process.env.STRIPE_PUBLISHABLEID
    })
});
app.post("/api/create-payment-intent", async (req, res) => {

})
app.use(notFound);
app.use(errorHandler);



app.listen(port, () => console.log(`Server Running on Port ${port}`))