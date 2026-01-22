import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export const getProfile = async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.user!.id);
  res.json(user);
};

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
};
