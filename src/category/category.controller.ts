import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from 'src/dto/create.category.dto';
import { Category } from 'src/typeorm';
import { HttpExceptionFilter } from 'src/filter/exception.filter';
import { UpdateCategoryDto } from 'src/dto/update.category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post('/create')
  @UsePipes(ValidationPipe)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto
  ): Promise<Category> {
    return await this.categoryService.createCategory(createCategoryDto);
  }
  @Get()
  @UseFilters(HttpExceptionFilter)
  async getCagories(): Promise<Category[]> {
    return await this.categoryService.getCagories();
  }

  @Delete(':id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.deleteCategory(id);
  }

  @Put(':id')
  async updateCategory(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('id', ParseIntPipe) id: number
  ) {
    return await this.categoryService.updateCategory(updateCategoryDto, id);
  }
}
