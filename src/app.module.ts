import { Global, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from './authentication/authentication.module';
import { CategoryModule } from './category/category.module';
import entities from './typeorm';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filter/exception.filter';
import { ProductModule } from './product/product.module';
@Global()
@Module({
  imports: [UsersModule,TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'host.docker.internal',
    // host: '172.24.224.1',
    port: 3306,
    username: 'root',
    password: '',
    database: 'testuser',
    synchronize: true,
    entities: entities,
    autoLoadEntities: true,
    }),
    AuthenticationModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
