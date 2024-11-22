import express, { Request, Response } from 'express';
import cors from 'cors';

import gridRoutes from "./routes/grid"
import paymentRoutes from "./routes/payment"
import initAltarioDB from './db';

const app = express();
const PORT = process.env.EXPRESS_PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(initAltarioDB);

app.use('/grid', gridRoutes);
app.use('/payment', paymentRoutes)

app.get('/ping', (_req: Request, res: Response) => {
  res.status(200).send({ message: 'pong' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
