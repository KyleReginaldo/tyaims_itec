import { Category } from 'src/typeorm';

export class UpdateProductDto {
  productName: string;
  productDescription: string;
  quantity: number;
  size: string;
  expirationDate: string;
  price: number;
  category: Category;
  brand: string;
}
