import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from 'src/dto/create.category.dto';
import { Category } from 'src/typeorm';
import { HttpExceptionFilter } from 'src/filter/exception.filter';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post('/create')
  @UsePipes(ValidationPipe)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.createCategory(createCategoryDto);
  }
  @Get()
  @UseFilters(HttpExceptionFilter)
  async getCagories(): Promise<Category[]> {
    return await this.categoryService.getCagories();
  }
}
