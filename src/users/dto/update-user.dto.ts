import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({ example: 'Juan Pérez', description: 'Describe el nombre del usuario.'})
    @IsOptional() // Hace que el campo sea opcional
    @IsString()
    name?: string;
  
    @ApiProperty({ example: 'test@test.com', description: 'El correo electrónico del usuario.'})
    @IsOptional()
    @IsEmail()
    email?: string;
}
