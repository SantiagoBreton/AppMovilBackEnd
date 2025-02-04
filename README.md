# AppMovilBackEnd


## Descripción
AppMovilesBE es la API backend para la aplicación móvil AppMovilProyecto. Proporciona endpoints para la autenticación de usuarios, gestión de datos y otras funcionalidades clave.

## Tecnologías Utilizadas

- **Lenguaje:** TypeScript
- **Framework:** Express.js
- **Base de Datos:** Prisma con PostgreSQL (u otro motor compatible)
- **Autenticación:** JSON Web Tokens (JWT)
- **Cifrado de Contraseñas:** bcryptjs
- **Gestión de Archivos:** multer

## Instalación y Configuración

### Prerrequisitos
Asegúrate de tener instalado:
- **Node.js** (versión recomendada: 18 o superior)
- **PostgreSQL** u otro motor de base de datos compatible
- **Prisma CLI**

### Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/appmovilesbe.git
   cd appmovilesbe
   ```
2. Instala las dependencias:
  📦 Dependencias principales
  Ejecuta cada línea para instalar las dependencias de producción:
```bash
 npm install @prisma/client
 npm install bcryptjs
 npm install express
 npm install jsonwebtoken
 npm install multer

  ```

   🛠 Dependencias de desarrollo

 ```bash
  npm install --save-dev @types/bcryptjs
  npm install --save-dev @types/express
  npm install --save-dev @types/jsonwebtoken
  npm install --save-dev @types/multer
  npm install --save-dev nodemon
  npm install --save-dev prisma
  npm install --save-dev ts-node
  npm install --save-dev ts-node-dev
  npm install --save-dev typescript

  ```
🔄 Instalación rápida
 ```bash
npm install
```
   

### Configuración de Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:
```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/tu_base_de_datos
JWT_SECRET=tu_secreto_seguro
PORT=5000
```

### Configuración de la Base de Datos
Ejecuta las migraciones y genera el esquema de la base de datos con Prisma:
```bash
npx prisma migrate dev --name init
npx prisma generate
```
Si necesitas poblar la base de datos con datos iniciales, ejecuta:
```bash
npx prisma db seed
```

## Ejecución
- Para iniciar el servidor en modo desarrollo:
  ```bash
  npm run dev
  ```
- Para compilar el código TypeScript:
  ```bash
  npm run tsc
  ```
- Para ejecutar el servidor en producción:
  ```bash
  npm start
  ```

## Estructura del Proyecto
```
appmovilesbe/
├── src/
│   ├── controllers/     # Controladores de la API
│   ├── middlewares/     # Middleware para autenticación y validaciones
│   ├── models/          # Modelos de datos
│   ├── routes/          # Definición de rutas
│   ├── services/        # Lógica de negocio
│   ├── utils/           # Funciones auxiliares
│   ├── index.ts         # Punto de entrada principal
├── prisma/              # Configuración de Prisma
├── build/               # Código compilado para producción
├── package.json         # Dependencias y configuración del proyecto
└── README.md            # Documentación del proyecto
```



