import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'Juan Pérez', description: 'Describe el nombre del usuario.'})
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @ApiProperty({ example: 'test@test.com', description: 'El correo electrónico del usuario.'})
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @ApiProperty({ example: 'MiClaveSegura123', description: 'Contraseña del usuario'})
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}
