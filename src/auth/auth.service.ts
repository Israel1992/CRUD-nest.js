import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ResponseDto } from 'src/users/dto/response.dto';

@Injectable()
export class AuthService {
  constructor( 
    private usersService: UsersService,
    private jwtService: JwtService
) {}

async signIn(email: string, pass: string){
    try {
      const userResponse = await this.usersService.findEmail(email);
      if (!userResponse.success || !userResponse.data) {
        return new ResponseDto(false, "Usuario no encontrado.", null, null);
      }

      const user = userResponse.data;
      const isValidPassword = await this.usersService.validatePassword(pass, user.password);

      if (!isValidPassword || !isValidPassword) {
        return new ResponseDto(false, "Credenciales incorrectas.", null, null);
      }

      const payload = { sub: user.id, username: user.name };
      const access_token = await this.jwtService.signAsync(payload);

      return new ResponseDto(true, "Inicio de sesión exitoso.", { access_token });
    } catch (error) {
      //Nota de mejora: Se puede guardar el error en una base de datos como catálogo de logs.
      return new ResponseDto(false, "Error en la autenticación.", null, error);
    }
  }
}