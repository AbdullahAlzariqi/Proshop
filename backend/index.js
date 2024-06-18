import path from 'path';
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
import uploadRoutes from './routes/uploadRoues.js'
const port = process.env.PORT || 5000;



connectDB(); //Connect to mongoDB 
const app = express();

// To parse request bodies 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Stripe Configuration 
const stripeConfig = new stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-08-01"
})

//cookie parser
app.use(cookieParser())





app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/uploads', uploadRoutes);
app.get("/api/payment/config", (req, res) => {
    res.send({
        pubishableKey: process.env.STRIPE_PUBLISHABLEID
    })
});

const __dirname = path.resolve(); // Set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


app.post("/api/payment/create-payment-intent", async (req, res) => {
    try {
        const paymentIntent = await stripeConfig.paymentIntents.create({
            currency: 'eur',
            amount: 200,
            automatic_payment_methods: {
                enabled: true
            }
        });

        res.send({ clientSecret: paymentIntent.client_secret })
    } catch (e) {
        return res.status(400).send({
            error: {
                message: e.message
            }
        })
    }
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')))
} else {
    app.get('/', (req, res) => {
        res.send('API is Running...')
    });
}


app.use(notFound);
app.use(errorHandler);



app.listen(port, () => console.log(`Server Running on Port ${port}`))