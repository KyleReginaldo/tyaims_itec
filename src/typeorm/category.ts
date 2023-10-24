import exp from "constants";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Category{
    @PrimaryGeneratedColumn({type:'bigint',name: 'category_id'})
    id: number;
    @Column({type: 'varchar',name: 'category_name'})
    @Unique(["category_name"])
    categoryName: string;
    @Column({type: "bool",name: 'is_deleted'})
    isDeleted: boolean;
}