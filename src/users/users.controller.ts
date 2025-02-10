import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Query} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  /*
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  */

  /****************************************************************************************** */
  //Con UseGuards nos aseguramos que no puedan ser usados hasta contar con el token.
  /****************************************************************************************** */
  
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Crear un usuario.' })
  @ApiBody({ type: CreateUserDto }) 
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios por paginación "page" número de página y "limit" número de registros por página.'})
  async findPaginated(@Query('page') page: string, @Query('limit') limit: string) {
    // Convierte los parámetros de la URL a números y establece valores predeterminados si no se pasan
    const pageNumber = parseInt(page, 10) || 1; // Default page = 1
    const limitNumber = parseInt(limit, 10) || 10; // Default limit = 10
    const result = await this.usersService.findPaginated(pageNumber, limitNumber);
    return result;
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario.' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por ID.' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
