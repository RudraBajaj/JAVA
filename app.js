import express from 'express';
import cardRoutes from './routes/routes.js'; 

const app = express();
const PORT = 5000;

app.use(express.json()); 

app.use('/cards', cardRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Card API!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
