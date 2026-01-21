import { AppDataSource } from "../data-source";
import { User, UserRole } from "../entity/User";
import { hashPassword, comparePassword } from "../utils/password";
import { signToken } from "../utils/jwt";

const userRepo = () => AppDataSource.getRepository(User);

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: UserRole,
) => {
  const existingUser = await userRepo().findOne({ where: { email } });
  console.log(userRepo().createQueryBuilder().getQuery());
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await hashPassword(password);
  const newUser = userRepo().create({
    name,
    email,
    password: hashedPassword,
    role,
  });
  await userRepo().save(newUser);
  console.log(userRepo().createQueryBuilder().getQuery());
  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const user = await userRepo().findOne({ where: { email } });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
  const token = signToken({ id: user.id, role: user.role });
  return { user, token };
};
