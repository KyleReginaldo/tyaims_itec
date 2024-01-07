import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from 'src/dto/create.product.dto';
import { Product } from 'src/typeorm';
import { UpdateProductDto } from 'src/dto/update.product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async createProduct(
    @Body() createProductDto: CreateProductDto
  ): Promise<Product> {
    return await this.productService.createProduct(createProductDto);
  }

  @Get()
  async getProducts(): Promise<Product[]> {
    return await this.productService.getProducts();
  }

  @Delete('delete/:id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.productService.deleteProduct(id);
  }
  @Put('update/:id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ): Promise<Product> {
    return await this.productService.updateProduct(id, updateProductDto);
  }
  @Get(':id')
  async fetchProductById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Product> {
    return this.productService.fetchProductById(id);
  }

  @Get('/search')
  async searchProduct(
    @Query('productName') productName: string
  ): Promise<Product[]> {
    return await this.productService.searchProduct(productName);
  }
}
