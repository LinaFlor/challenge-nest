# API Usuarios Challenge

Esta es una API REST construida con NestJS como parte de un challenge técnico. El objetivo es gestionar usuarios mediante operaciones CRUD.

## 📌 Requerimientos cumplidos

- Crear un nuevo usuario con sus datos de perfil.
- Obtener lista de usuarios con opción de filtro por texto.
- Obtener detalles de un usuario por su ID.
- Actualizar información de un usuario por su ID.
- Eliminar un usuario por su ID.
- Validación de datos y unicidad de correo electrónico.
- Manejo de errores con respuestas JSON claras.
- Simulación de autenticación y autorización con Guards (sin JWT).
- Pruebas unitarias y de integración con Jest.
- Documentación Swagger.
- Dockerfile para ejecución en contenedor.

## 🚀 Tecnologías utilizadas

- NestJS
- TypeScript
- Jest (testing)
- Supertest (e2e testing)

## 📂 Estructura del proyecto

- `src/users`: Módulo principal para usuarios.
- `src/auth`: Simulación de roles y autenticación mediante guards.
- `test`: Pruebas unitarias y e2e.

## 🔗 Endpoints Disponibles

- `POST /users` → Crear un nuevo usuario.
- `GET /users` → Obtener lista de usuarios (incluye filtro por texto opcional).
- `GET /users/:id` → Obtener un usuario por su ID.
- `PATCH /users/:id` → Actualizar usuario por su ID.
- `DELETE /users/:id` → Eliminar usuario por su ID.

## 🔐 Autenticación y Autorización

La API implementa una simulación de autenticación con guards que verifican roles (por ejemplo: `'admin'`, `'user'`). No se utiliza JWT, pero se demuestra el manejo de permisos a nivel de rutas.

## 🛠️ Instalación y ejecución local

```bash
npm install
npm run start:dev
```

La API estará disponible en `http://localhost:3000`.

## 🧪 Pruebas

### Unitarias

```bash
npm run test
```

### End to End

```bash
npm run test:e2e
```

## 🐳 Docker

```bash
docker build -t api-usuarios-challenge .
docker run -p 3000:3000 api-usuarios-challenge
```

## 🧾 Documentación Swagger

Una vez levantada la API, accedé a la documentación en:

```
http://localhost:3000/api
```

## 🗒️ Notas

- No se utiliza base de datos; el almacenamiento es en memoria.
- No se requieren variables de entorno para ejecutar.
- El guard simula roles de usuario, por lo que se pueden probar restricciones de acceso.