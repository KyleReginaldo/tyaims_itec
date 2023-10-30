import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category';

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'product_id' })
  id: number;
  @Column({ type: 'varchar', name: 'product_name', nullable: true })
  productName: string;
  @Column({ type: 'varchar', name: 'product_description', nullable: true })
  productDescription: string;
  @Column({ type: 'bigint', name: 'quantity', nullable: true })
  quantity: number;
  @Column({ type: 'varchar', name: 'size', nullable: true })
  size: string;
  @Column({ type: 'varchar', name: 'expiration_date', nullable: true })
  expirationDate: string;
  @Column({ type: 'bigint', name: 'price', nullable: true })
  price: number;
  @OneToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
