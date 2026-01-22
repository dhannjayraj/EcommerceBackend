import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

const repo = () => AppDataSource.getRepository(User);

export const getUserById = async (id: number) => {
  const user = await repo().findOne({ where: { id } });

  if (!user) throw new Error('User not found');

  // password hide
  const { password, ...safe } = user as any;
  return safe;
};

export const getAllUsers = async () => {
  const users = await repo().find();
  return users.map((u: any) => {
    const { password, ...safe } = u;
    return safe;
  });
};
