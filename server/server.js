import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './src/routes/userRoute.js';
import stripe from './src/routes/strip.js';
import order from './src/routes/order.js';
import eventRoute from './src/routes/eventsRoute.js'
const app = express();

app.use(cors({
    origin: ['http://192.168.100.5:8081','http://192.168.100.5:4002'],
    credentials: true,
}));

// app.use(cors());

app.use(cookieParser());
app.use(express.json()); 

app.use('/api/users', userRouter);
app.use('/api/stripe',stripe)
app.use('/api/orders',order)
app.use('/api/events',eventRoute)

mongoose.connect("mongodb+srv://mbh133089:Apnalawao@ecommerce.dupjv.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce", {
    dbName: 'ecommerce'
})
    .then(() => console.log('MongoDB is Connected!'))
    .catch((err) => console.log('MongoDB Connection Error:', err));

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
