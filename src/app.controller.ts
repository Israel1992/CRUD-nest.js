import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //Uso solo con fines de prueba
  @Get()
  getTest(): string {
    return this.appService.getTest();
  }
}
