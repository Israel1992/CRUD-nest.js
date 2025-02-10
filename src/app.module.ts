import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
const envModule = ConfigModule.forRoot({isGlobal: true,})
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
  envModule,
  MongooseModule.forRoot(process.env.MONGODB ?? "mongodb://localhost:27017/"), 
  UsersModule, 
  AuthModule]
  ,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
