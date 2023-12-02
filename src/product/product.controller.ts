import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
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
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productService.createProduct(createProductDto);
  }

  @Get()
  async getProducts(): Promise<Product[]> {
    return await this.productService.getProducts();
  }

  @Delete('delete/:id')
  async deleteProductById(@Param('id') id: string): Promise<any> {
    return await this.productService.deleteProductById(id);
  }
  @Put('update/:id')
  async updateProductById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productService.updateProductById(id, updateProductDto);
  }
}
