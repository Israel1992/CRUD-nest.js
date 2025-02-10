
## Description

EXAMEN TECNICO NODE

Descripción del Examen:
El candidato debe desarrollar algunos servicios para una aplicación web que permita gestionar un listado de usuarios. El backend deberá implementar las operaciones CRUD (Create, Read, Update, Delete) sobre los usuarios, así como las siguientes características:
Paginación: El listado de usuarios deberá ser paginado para mejorar el rendimiento y la experiencia del usuario.
Autenticación: Todas las peticiones al backend deberán requerir un token de acceso válido para su procesamiento.
Estructura de los usuarios: Cada usuario deberá tener al menos los siguientes campos: 
ID (UUID)
Nombre
Correo electrónico
Contraseña (almacenada de forma segura, por ejemplo, utilizando bcrypt)
Endpoints: 
POST /users: Crea un nuevo usuario.
GET /users: Obtiene una lista paginada de usuarios.
GET /users/:id: Obtiene un usuario específico por su ID.
PUT /users/:id: Actualiza un usuario existente.
DELETE /users/:id: Elimina un usuario.

Requisitos Técnicos:
Node.js y pnpm: Se debe utilizar una versión estable de Node.js y pnpm.
Framework: El candidato es libre de utilizar cualquier framework de Node.js (Express, Koa, etc.), pero es preferible usar NestJS.
Base de datos:  El candidato deberá utilizar MongoDb como base de datos (Es libre de utilizar cualquier tipo de ORM)
Documentación: El código debe estar bien documentado, siguiendo un estilo de código consistente.
Evaluación:
Se evaluarán los siguientes aspectos:
Funcionalidad: Si los servicios son implementados correctamente con todas las funcionalidades y validaciones requeridas.
Calidad del código: La claridad, eficiencia y mantenibilidad del código.
Estructura: La organización del proyecto y la elección de las tecnologías.
Seguridad: La implementación de medidas de seguridad adecuadas.
Documentación: La claridad y exhaustividad de la documentación.
Entrega:
El candidato deberá entregar el código fuente del proyecto, junto con un documento que explique la arquitectura del sistema y las decisiones de diseño tomadas.
Consideraciones Adicionales:
Tiempo: El candidato tendrá un limite de 2 horas para realizar la prueba.


## Project setup

```bash
$ npm install
```

## Compile and run the project

Debe tener una base de datos mongo y colocar la cadena de conexión en .env 
Importar el archivo "test.users.json" a su DB para tener el usuario Admin que permitira generar los tokens

Datos del Usuarios Administrador
{
  "name": "Admin",
  "email": "admin@test.com",
  "password": "MiClaveSegura777"
}

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - Edgar Israel González Salgado
- Web - https://cv-liard-one.vercel.app/

