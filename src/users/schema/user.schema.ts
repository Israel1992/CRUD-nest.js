import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { v4 as uuidv4 } from "uuid";

//Se usa ODM y no ORM  ya que se usa mongo y no es relacional.
export type UserSchema = HydratedDocument<User>

@Schema()
export class User {
  @Prop({ default: uuidv4, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: true })
  status: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);