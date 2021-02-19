import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../models/product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productModelRepository: Repository<Product>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productModelRepository.find({});
  }

  async getOne(id: number): Promise<Product> {
    return this.productModelRepository.findOne(id);
  }

  async createProduct(product: Product) {
    const query = await this.productModelRepository.create(product);
    this.productModelRepository.save(query);
  }

  async alterProduct(product: Product, id: string): Promise<Product> {
    let productToUpdtate = await this.productModelRepository.findOne(id);
    productToUpdtate = this.productModelRepository.merge(
      productToUpdtate,
      product,
    );
    this.productModelRepository.save(productToUpdtate);
    return productToUpdtate;
  }

  async deleteProduct(id: string) {
    await this.productModelRepository.delete(id);
  }
}
