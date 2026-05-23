import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/users.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan( 'dev' ));
app.use('/api', userRoutes);

app.use((req, res) => {
    return res.status(404).json({
        message: 'Route Not Found :('
    })
})


export default app;
