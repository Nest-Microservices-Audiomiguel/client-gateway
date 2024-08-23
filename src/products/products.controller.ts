import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/pagination';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      return await firstValueFrom(
        this.productsClient.send(
          {
            cmd: 'create_product',
          },
          createProductDto,
        ),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async findProducts(@Query() PaginationDto: PaginationDto) {
    try {
      return await firstValueFrom(
        this.productsClient.send(
          {
            cmd: 'find_all_products',
          },
          PaginationDto,
        ),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async findProductById(@Param('id', ParseIntPipe) id: number) {
    try {
      const product = await firstValueFrom(
        this.productsClient.send(
          {
            cmd: 'find_one_product',
          },
          { id },
        ),
      );

      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async deleteProductById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await firstValueFrom(
        this.productsClient.send(
          {
            cmd: 'delete_product',
          },
          { id },
        ),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
  @Patch(':id')
  async updateProductById(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto,
  ) {
    try {
      return await firstValueFrom(
        this.productsClient.send(
          {
            cmd: 'update_product',
          },
          { id, ...body },
        ),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
