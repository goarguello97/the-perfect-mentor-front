# 🎓 The Perfect Mentor

**Una plataforma moderna de mentoría que conecta mentores experimentados con aprendices ambiciosos a través de un sistema inteligente de matching y comunicación en tiempo real.**

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.18-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Redux](https://img.shields.io/badge/Redux-2.11.2-764ABC?style=flat-square&logo=redux&logoColor=white)](https://redux.js.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.7.0-FFCA28?style=flat-square&logo=firebase&logoColor=white)](https://firebase.google.com/)

## 📖 Sobre el Proyecto

**The Perfect Mentor** es una aplicación web completa diseñada para facilitar relaciones de mentoría profesional. La plataforma utiliza algoritmos inteligentes para conectar mentores con mentees basándose en sus habilidades, experiencia y objetivos profesionales.

### 🎯 Misión

Facilitar el crecimiento profesional mediante conexiones significativas entre expertos y aprendices, creando un entorno estructurado para compartir conocimiento y experiencia.

### ✨ Visión

Convertirse en la plataforma líder de mentoría profesional, democratizando el acceso a experiencia de calidad y fomentando el desarrollo continuo de habilidades.

---

## 🚀 Características Principales

### 🔐 Sistema de Autenticación Avanzado

- **Autenticación Firebase** con backend personalizado
- **Registro múltiple** para mentores y mentees
- **Verificación de email** automática
- **Recuperación de contraseña** segura
- **Gestión de sesiones** persistentes
- **Interfaz de login** moderna y responsive con animaciones suaves

### 🤝 Sistema de Matching Inteligente

- **Algoritmo de matching** basado en habilidades y objetivos
- **Sistema de solicitudes** bidireccional
- **Panel de matches** con estado en tiempo real
- **Notificaciones instantáneas** de nuevas coincidencias
- **Filtros avanzados** de búsqueda por especialidad
- **Gestión de matches** con aceptación/rechazo

### 💬 Comunicación en Tiempo Real

- **Chat integrado** con Socket.IO
- **Mensajería instantánea** entre usuarios conectados
- **Historial de conversaciones** persistente
- **Estado de escritura** en tiempo real
- **Interfaz de chat** moderna con emojis y timestamps
- **Notificaciones de mensajes** no leídos

### 👥 Gestión de Perfiles

- **Perfiles completos** con información profesional
- **Sistema de habilidades** categorizadas
- **Gestión de avatar** con subida de imágenes
- **Biografía profesional** editable
- **Estadísticas de mentoría** personalizadas
- **Validación de perfil** administrativa

### 📊 Panel Administrativo

- **Dashboard administrativo** con estadísticas en tiempo real
- **Gestión de usuarios** completa
- **Sistema de reportes** y moderación
- **Análisis de datos** con Chart.js
- **Control de acceso** basado en roles
- **Estadísticas de uso** y crecimiento mensual

### 📱 Diseño Responsive

- **Mobile-first** con adaptación perfecta
- **Interfaz táctil** optimizada
- **Navegación intuitiva** en todos los dispositivos
- **Animaciones fluidas** con Framer Motion
- **Indicadores de carga** elegantes
- **Diseño consistente** con Tailwind CSS

---

## 🛠 Stack Tecnológico

### Frontend

- **React 19.2.0** - Librería principal con latest features
- **TypeScript 5.9.3** - Tipado estático y desarrollo seguro
- **Vite 7.2.4** - Build tool ultra rápido
- **Tailwind CSS 4.1.18** - Framework CSS utility-first
- **Redux Toolkit 2.11.2** - Gestión de estado centralizada
- **React Router 7.28.1** - Navegación declarativa

### Estado & Comunicación

- **Redux Toolkit 2.11.2** - Estado predecible
- **React Redux 9.2.0** - Bindings React-Redux
- **Socket.IO Client 4.8.3** - Comunicación en tiempo real
- **React Query (TanStack Query)** - Server state management

### Autenticación & Backend

- **Firebase 12.7.0** - Autenticación y servicios cloud
- **Axios 1.13.2** - Cliente HTTP con interceptores
- **Custom Hooks** - Integración Firebase + Redux

### UI/UX

- **Framer Motion 12.27.5** - Animaciones fluidas
- **React Icons 5.5.0** - Biblioteca de iconos
- **React Spinners 0.17.0** - Indicadores de carga
- **SweetAlert2 11.26.17** - Alertas personalizadas
- **Chart.js 4.5.1** - Visualización de datos

### Desarrollo

- **ESLint 9.39.2** - Calidad de código
- **Prettier** - Formateo automático
- **PostCSS + Autoprefixer** - Procesamiento CSS
- **TypeScript Compiler** - Transpilación y type checking

---

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 o **yarn** >= 1.22.0
- **Git** para control de versiones
- **Cuenta Firebase** para autenticación
- **Backend API** corriendo en `http://localhost:3000/api` (ver repositorio: [the-perfect-mentor-api](https://github.com/goarguello97/the-perfect-mentor-api))

---

## 🚀 Instalación Detallada

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/the-perfect-mentor.git
cd the-perfect-mentor
```

### 2. Instalar Dependencias

```bash
# Usando npm
npm install

# Usando yarn
yarn install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Configuración Firebase
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id

# Configuración API
VITE_API_BASE_URL=tu_url_backend/api
VITE_SOCKET_URL=tu_url_backend:3000

# Configuración App
VITE_APP_NAME=The Perfect Mentor
VITE_APP_VERSION=1.0.0
```

### 4. Configuración Firebase

1. Ve a la [Consola Firebase](https://console.firebase.google.com/)
2. Crea un nuevo proyecto: `the-perfect-mentor-api`
3. Activa Authentication con Email/Password
4. Configura Firestore Database (si usas Firestore)
5. Copia las credenciales al archivo `.env.local`

### 5. Iniciar Servidor de Desarrollo

```bash
# Usando npm
npm run dev

# Usando yarn
yarn dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Redux store y hooks personalizados
│   ├── store.ts           # Configuración principal de Redux
│   └── hooks.ts           # Custom hooks para Redux
├── assets/                # Recursos estáticos
│   ├── images/            # Imágenes y logos
│   └── svg/               # Iconos SVG personalizados
├── components/            # Componentes UI reutilizables
│   ├── common/            # Componentes genéricos
│   ├── forms/             # Componentes de formulario
│   └── layout/            # Componentes de estructura
├── config/                # Configuraciones globales
│   ├── axios.ts           # Configuración de Axios
│   └── firebase.ts        # Configuración de Firebase
├── constants/             # Constantes de la aplicación
│   ├── api.ts             # Endpoints y URLs
│   ├── routes.ts          # Rutas de navegación
│   └── types.ts           # Tipos TypeScript
├── features/              # Redux slices por funcionalidad
│   ├── auth/              # Autenticación
│   ├── chat/              # Sistema de chat
│   ├── match/             # Matching de mentoría
│   ├── users/             # Gestión de usuarios
│   ├── reports/           # Sistema de reportes
│   └── roles/             # Gestión de roles
├── firebase/              # Configuración Firebase
│   └── config.ts          # Configuración inicial
├── helpers/               # Utilidades y helpers
│   ├── api.ts             # Helpers de API
│   └── utils.ts           # Utilidades generales
├── hooks/                 # Custom React hooks
│   ├── useAuth.ts         # Hook de autenticación
│   ├── useSocket.ts       # Hook de Socket.IO
│   └── useLocalStorage.ts # Hook de localStorage
├── pages/                 # Componentes de página
│   ├── auth/              # Páginas de autenticación
│   ├── dashboard/         # Dashboard principal
│   ├── chat/              # Páginas de chat
│   └── profile/           # Páginas de perfil
├── routes/                # Configuración de rutas
│   ├── ProtectedRoute.tsx # Rutas protegidas
│   └── index.tsx          # Configuración principal
├── styles/                # Estilos globales
│   └── globals.css        # Estilos base
└── types/                 # Definiciones de tipos TypeScript
    ├── auth.ts            # Tipos de autenticación
    ├── user.ts            # Tipos de usuario
    └── chat.ts            # Tipos de chat
```

---

## ⚙️ Configuración Adicional

### Variables de Entorno Opcionales

```env
# Configuración de desarrollo
VITE_DEV_MODE=true
VITE_DEBUG_MODE=true

# Configuración de producción
VITE_ANALYTICS_ID=tu_analytics_id
VITE_SENTRY_DSN=tu_sentry_dsn

# Configuración de features
VITE_ENABLE_CHAT=true
VITE_ENABLE_MATCHING=true
VITE_ENABLE_ANALYTICS=false
```

### Configuración de Firebase Services

```typescript
// firebase/config.ts
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
```

---

## 📖 Guía de Uso

### Flujo de Autenticación

1. **Registro de Usuario**:
   - Selección de rol (mentor/mentee)
   - Formulario con información básica
   - Verificación de email requerida
   - Redirección automática al dashboard

2. **Login de Usuario**:
   - Email y contraseña
   - Opción de "Recordar sesión"
   - Recuperación de contraseña disponible
   - Autenticación con token persistente

### Sistema de Matching

1. **Búsqueda de Mentores**:
   - Filtros por especialidad y país
   - Vista de cards con información clave
   - Sistema de favoritos
   - Detalles completos de perfil

2. **Proceso de Matching**:
   - Envío de solicitud de mentoría
   - Estado: pendiente → aceptado/rechazado
   - Notificaciones en tiempo real
   - Chat disponible tras aceptación

### Sistema de Chat

1. **Interfaz de Conversación**:
   - Lista de contactos activos
   - Indicadores de mensajes no leídos
   - Estado de escritura en tiempo real
   - Historial completo de conversación

2. **Funcionalidades del Chat**:
   - Mensajes de texto con timestamps
   - Soporte para emojis
   - Indicadores de entrega
   - Búsqueda en historial

### Panel Administrativo

1. **Dashboard Principal**:
   - Estadísticas de usuarios totales
   - Gráficos de crecimiento mensual
   - Matches realizados
   - Reportes pendientes

2. **Gestión de Usuarios**:
   - Lista completa de usuarios
   - Filtros por rol y estado
   - Acciones de edición/bloqueo
   - Verificación de perfiles

---

## 🔌 API Documentation

> **Nota**: La API backend está documentada completamente en [the-perfect-mentor-api](https://github.com/goarguello97/the-perfect-mentor-api) con Swagger UI disponible en `http://localhost:3000/api-docs`

### Endpoints Principales

#### 👥 **Gestión de Usuarios**

```typescript
GET    /api/users          # Listar usuarios
POST   /api/users          # Crear usuario
GET    /api/users/:id      # Obtener usuario
PUT    /api/users/:id      # Actualizar usuario
DELETE /api/users/:id      # Eliminar usuario
```

#### 🔗 **Sistema de Matching**

```typescript
POST   /api/matches        # Enviar solicitud de mentoría
GET    /api/matches        # Listar matches del usuario
PUT    /api/matches/:id    # Responder solicitud (aceptar/rechazar)
DELETE /api/matches/:id    # Cancelar match
```

#### 💬 **Mensajería (Real-time)**

```typescript
POST   /api/md             # Enviar mensaje
GET    /api/md/:userId     # Obtener conversación con usuario
PUT    /api/md/:id         # Marcar mensaje como leído
DELETE /api/md/:id         # Eliminar mensaje
```

#### 📊 **Reportes**

```typescript
POST   /api/reports        # Crear reporte de usuario
GET    /api/reports        # Listar reportes
PUT    /api/reports/:id    # Actualizar estado del reporte
DELETE /api/reports/:id    # Eliminar reporte
```

#### 🎭 **Roles**

```typescript
GET    /api/roles          # Listar roles disponibles
POST   /api/roles          # Crear nuevo rol
```

### 🔐 **Autenticación**

La API utiliza **Firebase Admin SDK** para autenticación. Todos los endpoints protegidos requieren:

```typescript
Authorization: Bearer <firebase-token>
```

### 📚 **Documentación Completa**

Para obtener detalles específicos de cada endpoint, incluyendo:

- Parámetros requeridos
- Ejemplos de request/response
- Códigos de error
- Limites de rate

Visita: [📖 Swagger UI Documentation](http://localhost:3000/api-docs)

### 🔗 **Conexión Frontend-Backend**

#### Configuración del Cliente

```typescript
// src/config/axios.ts
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// Interceptor para añadir token de Firebase
api.interceptors.request.use(async (config) => {
  const token = await getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

#### Conexión Socket.IO

```typescript
// src/hooks/useSocket.ts
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  auth: {
    token: await getAuthToken(),
  },
});

// Eventos principales
socket.on('match_request', (data) => handleNewMatch(data));
socket.on('new_message', (message) => handleMessage(message));
socket.on('user_connected', (userId) => handleUserConnect(userId));
```

#### Usuarios

```typescript
GET /api/users/profile
PUT /api/users/profile
GET /api/users/search
GET /api/users/:id
POST /api/users/avatar
```

#### Matching

```typescript
GET /api/match/mentors
POST /api/match/request
PUT /api/match/respond
GET /api/match/my-matches
DELETE /api/match/:id
```

#### Chat

```typescript
GET /api/chat/conversations
GET /api/chat/messages/:userId
POST /api/chat/send
PUT /api/chat/read/:userId
```

#### Reportes

```typescript
POST /api/reports/create
GET /api/reports/list
PUT /api/reports/resolve/:id
```

### Redux Slices Structure

#### Auth Slice

```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
```

#### Chat Slice

```typescript
interface ChatState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Message[];
  isTyping: Record<string, boolean>;
  unreadCount: Record<string, number>;
}
```

#### Match Slice

```typescript
interface MatchState {
  mentors: User[];
  matches: Match[];
  requests: MatchRequest[];
  isLoading: boolean;
}
```

---

## 🤝 Contribución

### Cómo Contribuir

1. **Fork el repositorio**
2. **Crear una rama** (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit los cambios** (`git commit -m 'Agregar nueva funcionalidad'`)
4. **Push a la rama** (`git push origin feature/nueva-funcionalidad`)
5. **Abrir un Pull Request**

### Convenciones de Código

- **Componentes**: PascalCase (`UserProfile.tsx`)
- **Funciones**: camelCase (`getUserProfile()`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Archivos de tipos**: `.types.ts`
- **Hooks**: `use` prefix (`useAuth()`)

### Reglas de ESLint

```javascript
{
  "extends": [
    "react-app",
    "react-app/jest",
    "@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "react-hooks/exhaustive-deps": "warn",
    "prefer-const": "error"
  }
}
```

### Testing (cuando se implemente)

```bash
# Ejecutar tests
npm run test

# Tests con coverage
npm run test:coverage

# Tests en modo watch
npm run test:watch
```

---

## 🚀 Build y Despliegue

### Build de Producción

```bash
# Build para producción
npm run build

# Preview del build
npm run preview

# Build con análisis
npm run build -- --analyze
```

### Variables de Entorno de Producción

```env
# API URLs (actualizar con dominio de producción)
VITE_API_BASE_URL=https://api.the-perfect-mentor.com/api
VITE_SOCKET_URL=https://api.the-perfect-mentor.com

# Firebase Producción
VITE_FIREBASE_PROJECT_ID=the-perfect-mentor-prod
VITE_FIREBASE_API_KEY=tu_production_api_key
VITE_FIREBASE_AUTH_DOMAIN=the-perfect-mentor-prod.firebaseapp.com
```

### Despliegue en Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel --prod
```

---

## 📊 Estado del Proyecto

### Versión Actual: **1.0.0**

### ✅ Funcionalidades Implementadas

- [x] Autenticación completa con Firebase
- [x] Sistema de usuarios y perfiles
- [x] Matching bidireccional
- [x] Chat en tiempo real
- [x] Panel administrativo
- [x] Sistema de reportes
- [x] Estadísticas y analytics
- [x] Diseño responsive

### 🚧 Próximas Features

- [ ] Videoconferencias integradas
- [ ] Sistema de calificaciones
- [ ] Certificados de mentoría
- [ ] Integración con LinkedIn
- [ ] App móvil nativa

---

### Derechos de Autor

© 2026 The Perfect Mentor. Todos los derechos reservados.

---

## 📞 Contacto

- **Frontend**: [GitHub Repository](https://github.com/tu-usuario/the-perfect-mentor)
- **Backend API**: [GitHub Repository](https://github.com/goarguello97/the-perfect-mentor-api)
- **Email**: contact@the-perfect-mentor.com
- **Issues**: [Frontend Issues](https://github.com/tu-usuario/the-perfect-mentor/issues) | [Backend Issues](https://github.com/goarguello97/the-perfect-mentor-api/issues)

---

## 🔗 Relacionado

### Backend API

Este proyecto frontend está diseñado para funcionar con el backend [**The Perfect Mentor API**](https://github.com/goarguello97/the-perfect-mentor-api):

- **🚀 Node.js + Express + TypeScript**
- **🗄️ MongoDB + Mongoose**
- **🔐 Firebase Admin SDK Authentication**
- **💬 Socket.io Real-time Communication**
- **📊 Complete REST API with Swagger Documentation**

### Arquitectura Full-Stack

```
Frontend (React)  ←→  Backend API (Node.js/Express)  ←→  MongoDB Database
       ↓                        ↓                           ↓
   Firebase Auth          Firebase Admin SDK           Mongoose ODM
   Socket.io Client        Socket.io Server           Documents Storage
```

---