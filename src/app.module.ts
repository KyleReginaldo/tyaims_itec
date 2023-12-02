import { Global, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from './authentication/authentication.module';
import { CategoryModule } from './category/category.module';
import entities from './typeorm';
import { ProductModule } from './product/product.module';
@Global()
@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-156379-0.cloudclusters.net',
      port: 10030,
      username: 'admin',
      password: 'GhLYBueO',
      database: 'trendy_uy',
      synchronize: true,
      entities: entities,
    }),
    AuthenticationModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
