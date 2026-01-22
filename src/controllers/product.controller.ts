import { Request, Response } from "express";
import * as productService from "../services/product.service";
import { validateProduct } from "../validations/product.validation";

export const create = async (req: Request, res: Response) => {
  try {
    // ✅ Validate product body
    validateProduct(req.body);
    
    const product = await productService.createProduct(
      req.body,
      (req as any).user,
    );
    res.status(201).json(product);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  const products = await productService.getAllProducts();
  res.json(products);
};

export const getOne = async (req: Request, res: Response) => {
  const product = await productService.getProductById(Number(req.params.id));
  res.json(product);
};

export const update = async (req: Request, res: Response) => {
  const product = await productService.updateProduct(
    Number(req.params.id),
    req.body,
  );
  res.json(product);
};

export const remove = async (req: Request, res: Response) => {
  await productService.deleteProduct(Number(req.params.id));
  res.status(204).send();
};
