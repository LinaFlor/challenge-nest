import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('users')

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
      return this.usersService.create(createUserDto);
  }
    

  @Get()
  findAll(@Query('search') search?: string) {
    return this.usersService.findAll(search);
  }

} 