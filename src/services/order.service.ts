import { AppDataSource } from '../data-source';
import { Order } from '../entity/Order';

export const getMyOrders = async (userId: number) => {
  return AppDataSource.getRepository(Order).find({
    where: { user: { id: userId } },
    relations: ['items', 'items.product'],
  });
};
