import { Request, Response } from 'express';
import * as reviewService from '../services/review.service';

export const createReview = async (req: Request, res: Response) => {
  const { productId, rating, comment } = req.body;

  const review = await reviewService.addReview(
    req.user!.id,
    productId,
    rating,
    comment
  );

  res.status(201).json(review);
};

export const getProductReviews = async (req: Request, res: Response) => {
  const productId = Number(req.params.productId);
  const reviews = await reviewService.getReviewsByProduct(productId);

  res.json(reviews);
};
