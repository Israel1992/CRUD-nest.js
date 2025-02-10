//IMPORTANTE: Se debe contar un formato de resultado estándar para lograr que las aplicaciones que usen la API tengan un entendimiento del manejo de resultados.
export class ResponseDto<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: any;
  
    constructor(success: boolean, message: string, data?: T, error?: any) {
      this.success = success;
      this.message = message;
      this.data = data;
      this.error = error;
    }
  }
  