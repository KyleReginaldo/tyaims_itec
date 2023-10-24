import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeTranformer } from 'src/code_transformer/code.transformer';
import { CreateCategoryDto } from 'src/dto/create.category.dto';
import { Category } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>){}

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category>{
        const newCategory = this.categoryRepository.create(createCategoryDto);
        return this.categoryRepository.save(newCategory).catch((error) => {
            console.log(error.errno);
            throw new HttpException(CodeTranformer.getCodeMessages(error.errno), HttpStatus.BAD_REQUEST);
        });
    }
    async getCagories(): Promise<Category[]>{
        return await this.categoryRepository.find().catch((error) => {
            console.log(error.code === "ER_DUP_ENTRY");
            throw new HttpException('potangina', HttpStatus.BAD_REQUEST);
        });;
    }
}
