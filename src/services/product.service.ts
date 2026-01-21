import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { Category } from "../entity/Category";
import { User } from "../entity/User";

const productRepo = () => AppDataSource.getRepository(Product);
const categoryRepo = () => AppDataSource.getRepository(Category);

export const createProduct = async (data: Partial<Product>, seller: User) => {
  const product = productRepo().create({
    ...data,
    seller,
  });

  return productRepo().save(product);
};

export const getAllProducts = async () => {
  return productRepo().find({
    relations: ["seller", "category"],
  });
};

export const getProductById = async (id: number) => {
  return productRepo().findOne({
    where: { id },
    relations: ["seller", "category"],
  });
};

export const updateProduct = async (id: number, data: Partial<Product>) => {
  await productRepo().update(id, data);
  return getProductById(id);
};

export const deleteProduct = async (id: number) => {
  return productRepo().delete(id);
};
