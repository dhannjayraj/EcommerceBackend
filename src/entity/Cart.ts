import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { CartItem } from "./CartItem";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User)
  @JoinColumn()
  user!: User;

  @OneToMany(() => CartItem, (item) => item.cart, { cascade: true })
  items!: CartItem[];
}
