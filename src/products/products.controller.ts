import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Post()
  createProduct() {
    return 'This action adds a new product';
  }

  @Get()
  findProducts() {
    return 'This action returns all products';
  }

  @Get(':id')
  findProductById(@Param('id') id: string) {
    return 'This action returns a product';
  }

  @Delete(':id')
  deleteProductById(@Param('id') id: string) {
    return 'This action removes a product';
  }
  @Patch(':id')
  updateProductById(@Param('id') id: string, @Body() body: any) {
    return 'This action updates a product';
  }
}
