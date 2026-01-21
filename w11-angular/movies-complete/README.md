# 🎬 Sistema de Gestión de Películas - Angular

Una aplicación completa para gestionar películas, categorías y actores usando Angular 19 y Supabase.

## 📋 Descripción del Proyecto

Este proyecto es una aplicación CRUD (Create, Read, Update, Delete) que permite:

- ✅ Gestionar películas con información detallada
- ✅ Organizar películas por categorías
- ✅ Asignar múltiples actores a cada película
- ✅ Crear nuevas categorías y actores sobre la marcha
- ✅ Navegación simple y fluida entre componentes

## 🏗️ Arquitectura de la Aplicación

### Estructura de Base de Datos

La aplicación utiliza 4 tablas en Supabase:

```
┌─────────────┐
│ CATEGORIES  │
│ - id        │
│ - name      │
└─────────────┘
       │
       │ (1 a muchos)
       ▼
┌─────────────────┐
│    MOVIES       │
│ - id            │
│ - title         │
│ - image         │
│ - description   │
│ - category_id   │
└─────────────────┘
       │
       │ (muchos a muchos)
       ▼
┌─────────────────┐      ┌─────────────┐
│  MOVIE_ACTORS   │◄────►│   ACTORS    │
│ - id            │      │ - id        │
│ - movie_id      │      │ - name      │
│ - actor_id      │      └─────────────┘
└─────────────────┘
```

### Componentes de la Aplicación

1. **MovieListComponent** - Lista todas las películas
2. **MovieFormComponent** - Formulario principal para crear/editar películas
3. **CategoryFormComponent** - Formulario para crear categorías
4. **ActorFormComponent** - Formulario para seleccionar/crear actores

### Flujo de Navegación

```
Lista de Películas (/movies)
    │
    ├─► Nueva Película (/movies/new)
    │       │
    │       ├─► Nueva Categoría (/categories/new) → Regresa
    │       └─► Agregar Actor (/actors/select) → Regresa
    │
    └─► Editar Película (/movies/edit/:id)
            └─► Agregar Actor (/actors/select) → Regresa
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm (viene con Node.js)
- Una cuenta en [Supabase](https://supabase.com)

### Paso 1: Clonar o Descargar el Proyecto

```bash
cd w11-angular/movies-complete
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

### Paso 3: Configurar Supabase

#### 3.1. Crear un Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Espera a que el proyecto se inicialice (puede tomar 1-2 minutos)

#### 3.2. Ejecutar el Script SQL

1. En tu proyecto de Supabase, ve a **SQL Editor** (en el menú lateral)
2. Crea una nueva query
3. Copia y pega todo el contenido del archivo `SUPABASE_SETUP.sql`
4. Haz clic en **Run** para ejecutar el script
5. Verifica que aparezca el mensaje de éxito

#### 3.3. Obtener las Credenciales

1. Ve a **Settings** > **API** en tu proyecto de Supabase
2. Copia los siguientes valores:
   - **Project URL** (algo como: `https://xxxxx.supabase.co`)
   - **anon/public key** (una clave larga que empieza con `eyJ...`)

#### 3.4. Configurar las Variables de Entorno

Edita el archivo `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  supabaseUrl: 'TU_PROJECT_URL_AQUI',  // Pega tu Project URL
  supabaseKey: 'TU_ANON_KEY_AQUI'      // Pega tu anon key
};
```

También actualiza `src/environments/environment.prod.ts` con los mismos valores.

### Paso 4: Ejecutar la Aplicación

```bash
npm start
```

La aplicación se abrirá automáticamente en [http://localhost:4200](http://localhost:4200)

## 📖 Guía de Uso

### 1. Crear una Categoría

Antes de crear películas, es recomendable crear algunas categorías:

1. Ve a **Nueva Película**
2. En la sección de Categoría, haz clic en **+ Nueva**
3. Ingresa el nombre de la categoría (ej: "Acción", "Drama", "Comedia")
4. Haz clic en **Crear Categoría**
5. Serás redirigido de vuelta al formulario de película

### 2. Crear una Película

1. Desde la lista de películas, haz clic en **+ Nueva Película**
2. Completa los campos:
   - **Título**: Nombre de la película
   - **URL de la Imagen**: Link a una imagen (debe empezar con http:// o https://)
   - **Descripción**: Sinopsis de la película
   - **Categoría**: Selecciona una categoría del dropdown
3. Haz clic en **Crear**
4. La película se guardará y podrás editarla para agregar actores

### 3. Agregar Actores a una Película

1. Edita una película existente
2. En la sección de **Actores**, haz clic en **+ Agregar Actor**
3. Puedes:
   - **Seleccionar un actor existente** del dropdown, o
   - **Crear un nuevo actor** escribiendo su nombre
4. Haz clic en **Agregar Actor**
5. El actor se agregará a la película

### 4. Editar o Eliminar

- Para **editar** una película, haz clic en el botón **✏️ Editar**
- Para **eliminar** una película, haz clic en **🗑️ Eliminar** (se te pedirá confirmación)

## 🎓 Conceptos Pedagógicos

Este proyecto está diseñado para enseñar:

### 1. Arquitectura de Componentes en Angular

- **Componentes standalone** (sin módulos)
- **Comunicación entre componentes** mediante navegación
- **Servicios inyectables** para lógica de negocio

### 2. Formularios Reactivos

- Uso de `FormBuilder` y `FormGroup`
- Validaciones síncronas
- Manejo de errores en formularios

### 3. Routing y Navegación

- Configuración de rutas
- Paso de parámetros (`:id`)
- Query parameters (`?returnUrl=...`)
- Navegación programática

### 4. Integración con API REST

- Uso de `HttpClient`
- Observables y operadores RxJS
- Manejo de errores con `catchError`
- Transformación de datos con `map`

### 5. Relaciones de Base de Datos

- **Uno a muchos**: Una categoría tiene muchas películas
- **Muchos a muchos**: Películas y actores (mediante tabla intermedia)
- **Foreign keys** y **CASCADE**

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/          # Componentes de la UI
│   │   ├── movie-list/      # Lista de películas
│   │   ├── movie-form/      # Formulario de películas
│   │   ├── category-form/   # Formulario de categorías
│   │   └── actor-form/      # Formulario de actores
│   ├── models/              # Interfaces TypeScript
│   │   ├── movie.model.ts
│   │   ├── category.model.ts
│   │   ├── actor.model.ts
│   │   └── movie-actor.model.ts
│   ├── services/            # Servicios para API
│   │   ├── movie.service.ts
│   │   ├── category.service.ts
│   │   ├── actor.service.ts
│   │   └── movie-actor.service.ts
│   ├── app.routes.ts        # Configuración de rutas
│   └── app.config.ts        # Configuración de la app
├── environments/            # Variables de entorno
│   ├── environment.ts       # Desarrollo
│   └── environment.prod.ts  # Producción
└── styles.css              # Estilos globales
```

## 🔧 Comandos Útiles

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start

# Compilar para producción
npm run build

# Generar un nuevo componente
npx ng generate component components/nombre-componente

# Generar un nuevo servicio
npx ng generate service services/nombre-servicio
```

## 🐛 Solución de Problemas

### Error: "No se pueden cargar las películas"

- Verifica que ejecutaste el script SQL en Supabase
- Confirma que las credenciales en `environment.ts` son correctas
- Revisa la consola del navegador (F12) para ver errores específicos

### Error: "CORS" o "Network Error"

- Asegúrate de que la URL de Supabase incluye `/rest/v1` al final
- Verifica que las políticas RLS estén configuradas correctamente

### Las imágenes no se muestran

- Verifica que las URLs de las imágenes sean válidas
- Asegúrate de que las URLs empiecen con `http://` o `https://`

## 📚 Recursos Adicionales

- [Documentación de Angular](https://angular.io/docs)
- [Documentación de Supabase](https://supabase.com/docs)
- [Guía de Formularios Reactivos](https://angular.io/guide/reactive-forms)
- [Guía de Routing en Angular](https://angular.io/guide/router)

## 👨‍🏫 Para Profesores

Este proyecto está diseñado para ser didáctico y fácil de entender:

- ✅ Código comentado en español
- ✅ Arquitectura simple y clara
- ✅ Sin dependencias complejas
- ✅ Patrones de diseño estándar
- ✅ Separación clara de responsabilidades

### Temas que se pueden enseñar:

1. Componentes y templates en Angular
2. Servicios y dependency injection
3. Routing y navegación
4. Formularios reactivos y validaciones
5. HTTP y consumo de APIs
6. Observables y programación reactiva
7. Relaciones de base de datos
8. CRUD completo

## 📝 Licencia

Este proyecto es de uso educativo y puede ser modificado libremente.

---

**¡Disfruta aprendiendo Angular! 🚀**
