import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/dto/create.product.dto';
import { Product } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(createProductDto);
    return await this.productRepository.save(newProduct);
  }

  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['category'] });
  }
  async findProductById(id: number): Promise<Product> {
    return await this.productRepository
      .createQueryBuilder('product')
      .where('product.id= :productId', { productId: id })
      .getOne();
  }
}
