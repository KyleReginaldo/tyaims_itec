import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Product } from './product';
@Entity()
export class Category {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'category_id' })
  id: number;
  @Column({ type: 'varchar', name: 'category_name' })
  @Unique(['category_name'])
  categoryName: string;
  @Column({ type: 'bool', name: 'is_deleted' })
  isDeleted: boolean;
  @OneToMany(() => Product, (product) => product.category)
  product: Product;
}
