# Comic Store API

<p align="center">
  <strong>Backend API para una tienda de cómics - E-commerce completo con gestión de inventario, órdenes y usuarios</strong>
</p>

---

## 📋 Descripción del Proyecto

**Comic Store API** es el backend central de un e-commerce de cómics construido con **NestJS**. Proporciona una API RESTful robusta y escalable para gestionar:

- 📚 Catálogo de cómics con imágenes y metadata
- 👥 Usuarios y autenticación con JWT
- 🛒 Carritos de compra y órdenes con múltiples estados
- 🎨 Gestión de creadores (escritores, dibujantes, artistas de portada)
- 🏢 Gestión de editoriales
- 📦 Inventario y disponibilidad de cómics
- 📋 Sistema de reservas (pull requests)
- 🏠 Gestión de direcciones de envío

Es parte de una arquitectura de microservicios que incluye un **panel administrativo** (Next.js) para gestión y una **tienda online** (Next.js) para clientes.

---

## 🏗️ Arquitectura del Proyecto

```
ComicStore (E-commerce)
├── ecommerce-api (Este proyecto)
│   └── comic-store-api (NestJS - Backend)
├── ecommerce-admin
│   └── comic-shop-admin (Next.js - Panel administrativo)
└── ecommerce-store
    └── comic-shop-store (Next.js - Tienda online)
```

---

## 🛠️ Tecnologías Utilizadas

### Backend Framework

- **NestJS 11** - Framework progresivo de Node.js
- **TypeScript** - Tipado estático

### Base de Datos

- **PostgreSQL** - Base de datos relacional (Supabase)
- **Prisma ORM** - ORM moderno y seguro
- **Prisma Migrations** - Control de versiones de esquema

### Autenticación & Seguridad

- **JWT** - JSON Web Tokens para autenticación
- **Passport.js** - Middleware de autenticación
- **bcrypt** - Hash seguro de contraseñas
- **Supabase** - Autenticación y almacenamiento

### API & Documentación

- **Swagger/OpenAPI** - Documentación interactiva
- **Swagger UI Express** - UI para explorar endpoints

### Herramientas de Desarrollo

- **ESLint** - Linting de código
- **Prettier** - Formateador de código
- **Jest** - Framework de testing
- **pnpm** - Gestor de paquetes rápido

---

## ⚡ Quick Start

### Requisitos Previos

- **Node.js** 18+
- **pnpm** 8+
- **PostgreSQL** (o acceso a Supabase)
- **Git**

### Instalación

1. **Clonar el repositorio**

```bash
cd ecommerce-api/comic-store-api
```

2. **Instalar dependencias**

```bash
pnpm install
```

3. **Configurar variables de entorno**

Crear archivo `.env` en la raíz del proyecto:

```bash
# Base de Datos (PostgreSQL)
DATABASE_URL="postgresql://usuario:contraseña@host:puerto/nombre_db?pgbouncer=true"
DIRECT_URL="postgresql://usuario:contraseña@host:puerto/nombre_db"

# Supabase
SUPABASE_URL="https://tu-proyecto.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="tu_clave_secreta"

# JWT
JWT_SECRET="tu_secreto_seguro_aqui"
```

**Nota:** Véase `prisma/schema.prisma` para la estructura de la base de datos.

4. **Ejecutar migraciones de Prisma**

```bash
# Aplicar migraciones
pnpm exec prisma migrate deploy

# O generar migraciones
pnpm exec prisma migrate dev --name nombre_migracion
```

5. **Generar cliente de Prisma**

```bash
pnpm exec prisma generate
```

---

## 🚀 Ejecución

### Desarrollo

```bash
# Modo watch (recarga automática)
pnpm run start:dev

# La API estará disponible en: http://localhost:3001
# Swagger UI en: http://localhost:3001/api
```

### Producción

```bash
# Compilar
pnpm run build

# Ejecutar
pnpm run start:prod
```

### Debug

```bash
pnpm run start:debug
```

---

## 📚 Endpoints Principales

### Autenticación

- `POST /auth/register` - Registrar usuario (futuro)
- `POST /auth/login` - Iniciar sesión (futuro)

### Cómics

- `GET /comics` - Listar todos los cómics
- `GET /comics/:id` - Obtener cómic por ID
- `POST /comics` - Crear nuevo cómic (con imagen)
- `PATCH /comics/:id` - Actualizar cómic
- `DELETE /comics/:id` - Eliminar cómic

### Usuarios

- `GET /users` - Listar usuarios
- `GET /users/:id` - Obtener usuario por ID
- `POST /users` - Crear usuario
- `PATCH /users/:id` - Actualizar usuario

### Órdenes

- `GET /orders` - Listar órdenes
- `GET /orders/:id` - Obtener orden por ID
- `POST /orders` - Crear orden
- `PATCH /orders/:id` - Actualizar estado de orden

### Autores/Artistas (Personas)

- `GET /persons` - Listar personas
- `GET /persons/:id` - Obtener persona por ID
- `POST /persons` - Crear persona
- `DELETE /persons/:id` - Eliminar persona

### Editoriales

- `GET /publishers` - Listar editoriales
- `GET /publishers/:id` - Obtener editorial por ID
- `POST /publishers` - Crear editorial
- `DELETE /publishers/:id` - Eliminar editorial

### Direcciones

- `GET /addresses` - Listar direcciones
- `POST /addresses` - Crear dirección
- `DELETE /addresses/:id` - Eliminar dirección

### Órdenes de Compra (Pull Requests)

- `GET /orders` - Listar pull requests
- `POST /orders` - Crear pull request
- `PATCH /orders/:id` - Actualizar estado

---

## 🗄️ Estructura de la Base de Datos

### Modelos Principales

#### User (Usuario)

- `id` - ID único
- `email` - Email único
- `password` - Contraseña hasheada
- `name` - Nombre completo
- Relaciones: órdenes, pull requests, direcciones

#### Comic (Cómic)

- `id` - ID único
- `title` - Título
- `description` - Descripción
- `price` - Precio
- `imageUrl` - URL de la portada
- `releaseDate` - Fecha de lanzamiento
- Relaciones: escritor, dibujante, artista de portada, editorial, inventario

#### Person (Persona - Creador)

- `id` - ID único
- `name` - Nombre único
- `isWriter` - Es escritor
- `isDrawer` - Es dibujante
- Relaciones: cómics escritos, dibujados, portadas

#### Order (Orden)

- `id` - ID único
- `status` - Estado (PENDING, PAID, SHIPPED, DELIVERED, CANCELLED)
- `total` - Total del pedido
- `userId` - Usuario que realizó el pedido
- `shippingAddress` - Dirección de envío

#### Inventory (Inventario)

- `comicId` - ID del cómic
- `quantity` - Cantidad disponible

---

## 🧪 Testing

```bash
# Pruebas unitarias
pnpm run test

# Pruebas con cobertura
pnpm run test:cov

# Pruebas en modo watch
pnpm run test:watch

# Pruebas e2e
pnpm run test:e2e
```

---

## 📝 Formato de Código

```bash
# Ejecutar ESLint
pnpm run lint

# Formatear código con Prettier
pnpm run format
```

---

## 📊 Estados de Órdenes

**OrderStatus:**

- `PENDING` - Agregado al carrito o pendiente de pago
- `PAID` - Pago completado
- `SHIPPED` - Orden enviada
- `DELIVERED` - Orden entregada
- `CANCELLED` - Orden cancelada

**PullStatus:**

- `PENDING_PAYMENT` - En lista de reserva, pendiente de pago
- `PAID` - Pago completado, cómic reservado
- `FULLFILLED` - Cómic llegó, listo para entrega, eliminado del inventario
- `CANCELLED` - Cancelado o sin pago en tiempo razonable

---

## 🔐 Autenticación

La API utiliza **JWT (JSON Web Tokens)** para autenticación:

1. Cliente se autentica y recibe un JWT
2. JWT se incluye en el header `Authorization: Bearer <token>`
3. El servidor valida el token y otorga acceso

### Estrategia JWT

- Secret almacenado en `JWT_SECRET`
- Incluir token en header de peticiones autenticadas

---

## 📡 CORS Configurado

```javascript
allowedOrigins: ['http://localhost:3000'];
allowedMethods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'];
credentials: true;
```

Actualizar `src/main.ts` si se agregan dominio de producción.

---

## 🚀 Despliegue

### Requisitos

- Servidor con Node.js 18+
- Base de datos PostgreSQL
- Variables de entorno correctamente configuradas

### Proceso

```bash
# 1. Build
pnpm run build

# 2. Copiar .env a producción
# 3. Aplicar migraciones
pnpm exec prisma migrate deploy

# 4. Ejecutar
pnpm run start:prod
```

### Recomendaciones

- Usar gestor de procesos (PM2, systemd)
- Configurar HTTPS
- Implementar logging centralizado
- Configurar backups automáticos de BD
- Configurar monitoreo y alertas

---

## 📁 Estructura del Proyecto

```
src/
├── controllers/          # Controladores REST
│   ├── comics.controller.ts
│   ├── users.controller.ts
│   ├── orders.controller.ts
│   ├── person.controller.ts
│   ├── publisher.controller.ts
│   └── address.controller.ts
├── services/            # Lógica de negocio
│   ├── Comic.service.ts
│   ├── User.service.ts
│   ├── Order.service.ts
│   ├── Person.service.ts
│   ├── Publisher.service.ts
│   └── Address.service.ts
├── dto/                 # Data Transfer Objects (validación)
│   ├── Comic.dto.ts
│   ├── User.dto.ts
│   ├── Order.dto.ts
│   ├── Person.dto.ts
│   ├── Publisher.dto.ts
│   ├── Address.dto.ts
│   └── Inventory.dto.ts
├── models/              # Modelos de datos
├── modules/             # Módulos principales
│   └── comic.module.ts
├── prisma/              # Servicio de Prisma
│   ├── prisma.service.ts
│   └── prisma.module.ts
├── supabase/            # Integración Supabase
├── app.module.ts        # Módulo raíz
├── app.service.ts
├── app.controller.ts
└── main.ts             # Punto de entrada
```

---

## 🔄 Flujos de Negocio

### Compra de Cómic

1. Usuario revisa inventario
2. Agrega cómic al carrito (crea Order con status PENDING)
3. Procesa pago (status → PAID)
4. Proporciona dirección de envío
5. Sistema envía (status → SHIPPED)
6. Cliente recibe (status → DELIVERED)

### Reserva de Cómic (Pull Request)

1. Usuario solicita reservar cómic
2. Sistema crea PullRequest con status PENDING_PAYMENT
3. Usuario paga (status → PAID, inventario se reserva)
4. Cómic llega (status → FULLFILLED)
5. Cliente retira

---

## 🤝 Contribución

1. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
2. Commit cambios: `git commit -am 'Agregar nueva funcionalidad'`
3. Push: `git push origin feature/nueva-funcionalidad`
4. Crear Pull Request

---

## 📄 Licencia

Este proyecto está bajo licencia UNLICENSED.

---

## 📞 Soporte

Para reportar bugs o sugerencias, crear un issue en el repositorio.

---

## 🎯 Roadmap

- [ ] Implementar autenticación completa (registro/login)
- [ ] Agregar sistema de pagos (Stripe/PayPal)
- [ ] Notificaciones por email
- [ ] Sistema de reseñas y calificaciones
- [ ] Búsqueda y filtros avanzados
- [ ] Sistema de cupones/descuentos
- [ ] Dashboard de estadísticas
- [ ] Mejoras en caché y performance

---

**Última actualización:** Abril 2026
