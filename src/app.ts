import express from 'express';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import cartRoutes from './routes/cart.routes'


const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);



app.get('/health', (_req, res) => {
  res.json({ status: 'OK' });
});

export default app;
