import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/dto/create.product.dto';
import { UpdateProductDto } from 'src/dto/update.product.dto';
import { Product } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(createProductDto);
    return await this.productRepository.save(newProduct);
  }

  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ['category'],
      order: {
        createdAt: 'DESC',
      },
    });
  }
  async fetchProductById(id: number): Promise<Product> {
    return await this.productRepository.findOne({
      relations: ['category'],
      order: {
        createdAt: 'DESC',
      },
      where: { id: id },
    });
  }
  async deleteProduct(id: number): Promise<any> {
    const data = await this.productRepository
      .createQueryBuilder('users')
      .delete()
      .from(Product)
      .where('id = :id', { id: id })
      .execute();
    console.log('delete data: ${data}');
    return data;
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto
  ): Promise<Product> {
    await this.productRepository
      .createQueryBuilder()
      .update(Product)
      .set(updateProductDto)
      .where('id = :id', { id: id })
      .execute();
    return await this.productRepository.findOne({
      where: { id: id },
    });
  }
  async searchProduct(productName: string): Promise<Product[]> {
    return await this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.category', 'category')
      .where('product.productName like :productName', {
        productName: `'%${productName}%'`,
      })
      .getMany();
  }
}
