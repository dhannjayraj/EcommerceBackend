import { AppDataSource } from '../data-source';
import { Review } from '../entity/Review';

const repo = () => AppDataSource.getRepository(Review);

export const addReview = async (
  userId: number,
  productId: number,
  rating: number,
  comment?: string
) => {
  const review = repo().create({
    user: { id: userId } as any,
    product: { id: productId } as any,
    rating,
    comment,
  });

  return repo().save(review);
};

export const getReviewsByProduct = async (productId: number) => {
  return repo().find({
    where: { product: { id: productId } },
    relations: ['user'],
  });
};
