import { Response } from "express";
import { AppDataSource } from "../data-source";
import { AuthRequest } from "../middlewares/auth.middleware";
import { Order } from "../entity/Order";
import { Payment, PaymentStatus } from "../entity/Payment";

export class PaymentController {
  // Create payment intent (mock)
  static async createPayment(req: AuthRequest, res: Response) {
    try {
      const { orderId, idempotencyKey } = req.body;

      if (!idempotencyKey) {
        return res.status(400).json({ error: "idempotencyKey is required" });
      }

      const orderRepo = AppDataSource.getRepository(Order);
      const paymentRepo = AppDataSource.getRepository(Payment);

      const order = await orderRepo.findOneBy({ id: orderId });
      if (!order) return res.status(404).json({ error: "Order not found" });

      // If already created with same idempotencyKey, return existing
      const existing = await paymentRepo.findOne({
        where: { idempotencyKey },
      });

      if (existing) {
        return res.json({
          message: "Payment already created (idempotent)",
          payment: existing,
        });
      }

      const payment = paymentRepo.create({
        order,
        amount: order.totalAmount,
        status: PaymentStatus.PENDING,
        idempotencyKey,
      });

      await paymentRepo.save(payment);

      return res.status(201).json({
        message: "Payment intent created",
        payment,
      });
    } catch (e: any) {
      return res.status(400).json({ error: e.message });
    }
  }

  // Confirm payment (mock success/fail)
  static async confirmPayment(req: AuthRequest, res: Response) {
    try {
      const { paymentId, success } = req.body;

      const paymentRepo = AppDataSource.getRepository(Payment);

      const payment = await paymentRepo.findOne({
        where: { id: paymentId },
        relations: ["order"],
      });

      if (!payment) return res.status(404).json({ error: "Payment not found" });

      payment.status = success ? PaymentStatus.SUCCESS : PaymentStatus.FAILED;
      await paymentRepo.save(payment);

      return res.json({
        message: "Payment updated",
        payment,
      });
    } catch (e: any) {
      return res.status(400).json({ error: e.message });
    }
  }
}
