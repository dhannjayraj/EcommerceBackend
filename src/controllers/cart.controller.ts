import { Response } from 'express';
import { AppDataSource } from '../data-source';
import { Cart } from '../entity/Cart';
import { CartItem } from '../entity/CartItem';
import { Product } from '../entity/Product';
import { AuthRequest } from '../middlewares/auth.middleware';

export class CartController {
  static async addToCart(req: AuthRequest, res: Response) {
    const { productId, quantity } = req.body;
    const userId = req.user!.id;

    const cartRepo = AppDataSource.getRepository(Cart);
    const productRepo = AppDataSource.getRepository(Product);

    const product = await productRepo.findOneBy({ id: productId });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let cart = await cartRepo.findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
    });

    if (!cart) {
      cart = cartRepo.create({
        user: { id: userId } as any,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.product.id === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem = new CartItem();
      newItem.product = product;
      newItem.quantity = quantity;
      newItem.cart = cart;
      cart.items.push(newItem);
    }

    await cartRepo.save(cart);

    return res.json({ message: 'Item added to cart', cart });
  }

  static async getCart(req: AuthRequest, res: Response) {
    const cart = await AppDataSource.getRepository(Cart).findOne({
      where: { user: { id: req.user!.id } },
      relations: ['items', 'items.product'],
    });

    return res.json(cart);
  }
}
