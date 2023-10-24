import { IsNotEmpty } from "class-validator";
import { Unique } from "typeorm";

export class CreateCategoryDto{
    @IsNotEmpty()
    categoryName: string;
    @IsNotEmpty()
    isDeleted: boolean;
}