import { Controller, Get, Post, Body, Query, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiQuery, ApiParam, PartialType} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiResponse } from '@nestjs/swagger';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente.' }) 
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' }) 
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado: permisos insuficientes.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
    
  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiQuery({ name: 'search', type: String, required: false })
  @ApiResponse({ status: 200, description: 'Usuarios encontrados exitosamente.' })
  findAll(@Query('search') search?: string) {
    return this.usersService.findAll(search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por su ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado exitosamente.' })
  @ApiResponse({ status: 404, description: 'No se encontró el usuario.' })
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  
  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Actualizar un usuario por su ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
  @ApiBody({ type: PartialType(CreateUserDto) })
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado: permisos insuficientes.' })
  @ApiResponse({ status: 404, description: 'No se encontró el usuario.' })
  update(@Param('id') id: number, @Body() updateUserDto: Partial<CreateUserDto>) {
    return this.usersService.update(id, updateUserDto);
  }

  
  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Eliminar un usuario por su ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado: permisos insuficientes.' })
  @ApiResponse({ status: 404, description: 'No se encontró el usuario.' })
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }


} 