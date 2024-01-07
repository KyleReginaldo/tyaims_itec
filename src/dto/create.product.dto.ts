import { IsNotEmpty } from 'class-validator';
import { Category } from 'src/typeorm';

export class CreateProductDto {
  @IsNotEmpty()
  productName: string;
  productDescription: string;
  @IsNotEmpty()
  quantity: number;
  brand: string;
  @IsNotEmpty()
  size: string;
  @IsNotEmpty()
  expirationDate: string;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  category: Category;
}
