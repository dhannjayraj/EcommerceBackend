export const validateRegister = (body: any) => {
  if (!body.name || !body.email || !body.password) {
    throw new Error('name, email, password are required');
  }
};

export const validateLogin = (body: any) => {
  if (!body.email || !body.password) {
    throw new Error('email and password are required');
  }
};
