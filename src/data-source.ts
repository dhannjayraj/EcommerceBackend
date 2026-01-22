import "reflect-metadata";
import { DataSource } from "typeorm";
import { ENV } from "./config/env";
import { User } from "./entity/User";
import { Product } from "./entity/Product";
import { Category } from "./entity/Category";
import { Cart } from "./entity/Cart";
import { CartItem } from "./entity/CartItem";
import { Order } from "./entity/Order";
import { OrderItem } from "./entity/OrderItem";
import { Payment } from "./entity/Payment";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  username: ENV.DB_USER,
  password: ENV.DB_PASS,
  database: ENV.DB_NAME,
  synchronize: true, // dev only
  logging: true,
  entities: [
    User,
    Product,
    Category,
    Cart,
    CartItem,
    Order,
    OrderItem,
    Payment,
  ],
});
