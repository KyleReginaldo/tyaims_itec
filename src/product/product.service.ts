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
  async deleteProductById(id: string): Promise<any> {
    const data = await this.productRepository
      .createQueryBuilder('users')
      .delete()
      .from(Product)
      .where('id = :id', { id: id })
      .execute();
    console.log('delete data: ${data}');
    return data;
  }

  async updateProductById(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    // const product = await this.productRepository.findOneOrFail({
    //   where: { id: id },
    // });
    // if (!product.id) {
    //   // tslint:disable-next-line:no-console
    //   console.error("Todo doesn't exist");
    // }
    await this.productRepository.update(id, updateProductDto);
    return await this.productRepository.findOne({
      where: { id: id },
    });
  }
}
