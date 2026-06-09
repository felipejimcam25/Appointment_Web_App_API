import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/users.routes.js';

const app = express();

const allowedOrigins = [
    'https://localhost:3000',
    'http://localhost:5173',
    'https://appointment-web-app-api.onrender.com'
]

app.use(cors({
    origin: function (origin, callback) {
        if(!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not Allowed by CORS'))
        }
    }
}));
app.use(express.json());
app.use(morgan( 'dev' ));
app.use('/api', userRoutes);

app.use((req, res) => {
    return res.status(404).json({
        message: 'Route Not Found :('
    })
})


export default app;
