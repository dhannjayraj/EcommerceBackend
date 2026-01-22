import { AppDataSource } from '../data-source';
import { Cart } from '../entity/Cart';

export const getMyCart = async (userId: number) => {
  return AppDataSource.getRepository(Cart).findOne({
    where: { user: { id: userId } },
    relations: ['items', 'items.product'],
  });
};
