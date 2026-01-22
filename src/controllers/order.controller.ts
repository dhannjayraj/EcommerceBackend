import { Response } from "express";
import { AppDataSource } from "../data-source";
import { AuthRequest } from "../middlewares/auth.middleware";
import { Cart } from "../entity/Cart";
import { Order } from "../entity/Order";
import { OrderItem } from "../entity/OrderItem";
import { Product } from "../entity/Product";
import { validatePlaceOrder } from "../validations/order.validation";

export class OrderController {
  static async placeOrder(req: AuthRequest, res: Response) {
    validatePlaceOrder(req.body);
    const userId = req.user!.id;

    await AppDataSource.manager.transaction(async (manager) => {
      const cart = await manager.findOne(Cart, {
        where: { user: { id: userId } },
        relations: ["items", "items.product"],
      });

      if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty");
      }

      let totalAmount = 0;
      const orderItems: OrderItem[] = [];

      for (const item of cart.items) {
        const product = await manager.findOneBy(Product, {
          id: item.product.id,
        });

        if (!product || product.stock < item.quantity) {
          throw new Error(`Insufficient stock for ${item.product.name}`);
        }

        product.stock -= item.quantity;
        await manager.save(product);

        const orderItem = manager.create(OrderItem, {
          product,
          quantity: item.quantity,
          price: product.price,
        });

        totalAmount += product.price * item.quantity;
        orderItems.push(orderItem);
      }

      const order = manager.create(Order, {
        user: { id: userId } as any,
        items: orderItems,
        totalAmount,
      });

      await manager.save(order);

      // clear cart
      await manager.remove(cart.items);

      res.status(201).json({
        message: "Order placed successfully",
        order,
      });
    });
  }

  static async myOrders(req: AuthRequest, res: Response) {
    const orders = await AppDataSource.getRepository(Order).find({
      where: { user: { id: req.user!.id } },
      relations: ["items", "items.product"],
    });

    res.json(orders);
  }
}
