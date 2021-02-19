import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsController } from './controllers/products/products.controller';
import { ProductsService } from './controllers/products/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './models/product.model';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('DATABASE_TYPE') as 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        migrations: JSON.parse(
          configService.get<string>('DATABASE_MIGRATIONS'),
        ),
        migrationsRun: true,
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class AppModule {}

// Criar migration yarn migration:create NomeDaMigration
