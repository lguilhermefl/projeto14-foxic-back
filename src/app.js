import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import populateProductsCollection from './utils/insertProducts.js';
import dotenv from 'dotenv';
dotenv.config();
populateProductsCollection();

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor online na porta ${PORT}`));