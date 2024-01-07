import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
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
  @Column({ type: 'timestamp', name: 'expiration_date', nullable: true })
  expirationDate: Timestamp;
  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Timestamp;
  @Column({ type: 'bigint', name: 'price', nullable: true })
  price: number;
  @ManyToOne(() => Category, (category) => category.product)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
