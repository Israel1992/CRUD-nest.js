import { Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import * as bcrypt from "bcrypt";
import { ResponseDto } from './dto/response.dto';

//IMPORTANTE: Se debe contar un formato de resultado estándar "ResponseDto" para lograr que las aplicaciones que usen la API tengan un entendimiento del manejo de resultados.
//Nota de mejora: Guardar los mensajes como constantes globales y aplicables en cada método para no repetir texto y sean más mantenibles.

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>){}

  /*
  Para regresar todos los usuarios sin paginación.
  async findAll() {
    const count = await this.userModel.countDocuments();
    const users = await this.userModel.find({}).exec();
    return users;
  }
  */

  //Paginación usando las opciones que otorga mongoDB.
  async findPaginated(page: number, pageSize: number): Promise<any> {
    try{
      const skip = (page - 1) * pageSize;
      const users = await this.userModel.find({status:true}).skip(skip).limit(pageSize).exec();
      const totalUsers = await this.userModel.countDocuments({status:true}); 
      return new ResponseDto(true, 'Usuarios obtenidos correctamente.', {
        totalUsers,
        page,
        pageSize,
        totalPages: Math.ceil(totalUsers / pageSize),
        users,
      });
    } catch (error) {
       //Nota de mejora: Se puede guardar el error en una base de datos como catálogo de logs.
       return new ResponseDto(false, 'Error al obtener los usuarios.', null, error);
    }
  }

  async findOne(id: string) {
    try{
      const user = await this.userModel.findOne({_id: id, status: true}).exec();
      if (!user) return new ResponseDto(false, `Usuario con ID ${id} no encontrado.`, user);
      return new ResponseDto(true, 'Usuario encontrado.', user);
    } catch (error) {
      //Nota de mejora: Se puede guardar el error en una base de datos como catálogo de logs.
      return new ResponseDto(false, 'Error al buscar el usuario.', null, error);
    }
  }

  async findEmail(email: string){
    try{
      const user = await this.userModel.findOne({ email:email, status: true}).lean().exec();
      if (!user) {
        return new ResponseDto(true, 'No se encontró el usuario.', user);
      }
      return new ResponseDto(true, 'Usuario encontrado.', user);
    } catch (error) {
      //Nota de mejora: Se puede guardar el error en una base de datos como catálogo de logs.
      return new ResponseDto(false, 'Error al buscar el usuario por email.', null, error);
    }
  }

  //Usamos el Dto para verificar que los datos cumplan con los requisitos establecidos.
  async create(createUserDto: CreateUserDto) {
    try{
      //Encripta el password del usuario
      createUserDto.password = await this.setPassword(createUserDto.password);
      const createUser = new this.userModel(createUserDto);
      const savedUser = await createUser.save();
      return new ResponseDto(true, 'Usuario creado exitosamente.', savedUser);
    } catch (error) {
      //Nota de mejora: Se puede guardar el error en una base de datos como catálogo de logs.
      return new ResponseDto(false, 'Error al crear el usuario.', null, error);
    }
  }

  //Usamos el Dto para verificar que los datos cumplan con los requisitos establecidos.
  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.userModel.findOneAndUpdate({ _id: id, status: true }, updateUserDto, { new: true } 
      ).exec();
      if (!updatedUser) return new ResponseDto(false, `Usuario con ID ${id} no encontrado.`, updatedUser);
      return new ResponseDto(true, 'Usuario actualizado exitosamente.', updatedUser);
    } catch (error) {
      //Nota de mejora: Se puede guardar el error en una base de datos como catálogo de logs.
      return new ResponseDto(false, 'Error al actualizar el usuario.', null, error);
    }
  }

  //Elimina usuario, es una eliminación lógica por lo que cambia el status a false, esto debe ser así porque se debe tener un historial
  async remove(id: string) {
    try {
      const deletedUser = await this.userModel.findByIdAndUpdate(id, { status: false }, { new: true }).exec();
      if (!deletedUser) return new ResponseDto(true, `Usuario con ID ${id} no encontrado.`, deletedUser);
      return new ResponseDto(true, 'Usuario eliminado correctamente.', deletedUser);
    } catch (error) {
      //Nota de mejora: Se puede guardar el error en una base de datos como catálogo de logs.
      return new ResponseDto(false, 'Error al eliminar el usuario.', null, error);
    }
    
  }

  /****************************************************************** */
  //Métodos que ayudan en la encriptación y validación del password.
  /****************************************************************** */
  
  //Encriptación de contraseña utilizando bcrypt.
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  //validación de password utilizando bcrypt.
  async validatePassword(pass: string, passEncrip:string): Promise<boolean> {
    return await bcrypt.compare(pass, passEncrip);
  }
}
