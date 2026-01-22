export const validateProduct = (body: any) => {
  if (!body.name || !body.description || body.price == null || body.stock == null) {
    throw new Error('name, description, price, stock are required');
  }
};
