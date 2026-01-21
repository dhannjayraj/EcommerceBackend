import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { UserRole } from "../entity/User";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await registerUser(
      name,
      email,
      password,
      role || UserRole.CUSTOMER,
    );
    res.status(201).json({ message: "User registered", user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const data = await loginUser(email, password);

    res.json(data);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
