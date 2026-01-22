import { AppDataSource } from '../data-source';
import { Product } from '../entity/Product';
import { Category } from '../entity/Category';
import { User } from '../entity/User';
import { redisClient } from '../config/redis';

const productRepo = () => AppDataSource.getRepository(Product);
const categoryRepo = () => AppDataSource.getRepository(Category);

/**
 *   Create Product
 * - Seller required
 * - Cache invalidation after create
 */
export const createProduct = async (data: Partial<Product>, seller: User) => {
  const product = productRepo().create({
    ...data,
    seller,
  });

  const saved = await productRepo().save(product);

  //  Clear product list cache
  await redisClient.del('products:all');

  return saved;
};

/**
 *   Get All Products (CACHED)
 * - First tries Redis
 * - If not found, fetches from DB and caches for 60 seconds
 */
export const getAllProducts = async () => {
  const cacheKey = 'products:all';

  const cached = await redisClient.get(cacheKey);

  if (cached) {
    console.log('CACHE HIT -> Data is from Redis');
    return JSON.parse(cached);
  }

  console.log('CACHE MISS -> Data From Database');

  const products = await productRepo().find({
    relations: ['seller', 'category'],
  });

  await redisClient.set(cacheKey, JSON.stringify(products), { EX: 60 });

  return products;
};


/**
 *  Get Product By ID
 * (no caching yet to keep it simple)
 */
export const getProductById = async (id: number) => {
  return productRepo().findOne({
    where: { id },
    relations: ['seller', 'category'],
  });
};

/**
 *   Update Product
 * - Cache invalidation after update
 */
export const updateProduct = async (id: number, data: Partial<Product>) => {
  await productRepo().update(id, data);

  //  Clear product list cache
  await redisClient.del('products:all');

  return getProductById(id);
};

/**
 *   Delete Product
 * - Cache invalidation after delete
 */
export const deleteProduct = async (id: number) => {
  const result = await productRepo().delete(id);

  //  Clear product list cache
  await redisClient.del('products:all');

  return result;
};
