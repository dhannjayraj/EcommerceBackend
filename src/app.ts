import express from "express";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import cartRoutes from "./routes/cart.routes";
import orderRoutes from "./routes/order.routes";
import paymentRoutes from "./routes/payment.routes";
import { rateLimit } from './middlewares/rateLimit.middleware';
import { errorMiddleware } from "./middlewares/error.middleware";
import userRoutes from './routes/user.routes';
import reviewRoutes from './routes/review.routes';

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use(rateLimit(10, 60));
app.use(errorMiddleware)


app.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});

export default app;
