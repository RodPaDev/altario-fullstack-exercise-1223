import express from 'express';
import cors from 'cors';

import gridRoutes from "./routes/grid"

const app = express();
const PORT = process.env.EXPRESS_PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/grid', gridRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
