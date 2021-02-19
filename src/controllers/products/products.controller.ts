import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Product } from '../../models/product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  async getOne(@Param('id') id): Promise<Product> {
    return this.productsService.getOne(id);
  }

  @Post()
  async createProduct(@Body() product: Product) {
    this.productsService.createProduct(product);
  }

  @Put(':id')
  async alterProduct(@Body() product, @Param('id') id): Promise<Product> {
    return this.productsService.alterProduct(product, id);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id) {
    this.productsService.deleteProduct(id);
  }
}
