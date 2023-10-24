import exp from "constants";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category";

@Entity()
export class Product{
    @PrimaryGeneratedColumn({type:'bigint',name: 'product_id'})
    id: number;
    @Column({type: 'varchar',name: 'product_name'})
    productName: string;
    @Column({type: 'varchar',name: 'product_description'})
    productDescription: string;
    @Column({type: "bigint",name: 'quantity'})
    quantity: number;
    @Column({type: "varchar",name: 'size'})
    size: string;
    @Column({type: "varchar",name: 'expiration_date'})
    expirationDate: string;
    @Column({type: "bigint",name: 'price'})
    price: number;
    @OneToOne(() => Category, (category) => category.id)
    @JoinColumn({ name: 'category_id' })
    category: Category;
}