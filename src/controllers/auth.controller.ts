import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { UserRole } from "../entity/User";
import { successResponse, errorResponse } from "../utils/response";

import {
  validateRegister,
  validateLogin,
} from "../validations/auth.validation";

export const register = async (req: Request, res: Response) => {
  try {
    //  Validate incoming body
    validateRegister(req.body);

    const { name, email, password, role } = req.body;

    const user = await registerUser(
      name,
      email,
      password,
      role || UserRole.CUSTOMER,
    );

    return res
      .status(201)
      .json(successResponse(user, "User registered successfully"));
  } catch (err: any) {
    return res.status(400).json(errorResponse(err.message));
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // Validate incoming body
    validateLogin(req.body);

    const { email, password } = req.body;

    const data = await loginUser(email, password);

    res.json(data);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
