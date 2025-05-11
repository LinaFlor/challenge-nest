import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('admin')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
      return this.usersService.create(createUserDto);
  }
    

  @Get()
  @Roles('admin', 'user')
  findAll(@Query('search') search?: string) {
    return this.usersService.findAll(search);
  }

} 