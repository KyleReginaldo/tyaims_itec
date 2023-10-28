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
      host: 'mysql-152302-0.cloudclusters.net',
      port: 19472,
      username: 'admin',
      password: 'BbwGF2P3',
      database: 'test_db',
      synchronize: true,
      entities: entities,
      migrationsRun: true,
    }),
    AuthenticationModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
