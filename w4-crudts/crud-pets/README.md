# 🐾 CRUD de Mascotas con TypeScript y Supabase

Esta aplicación es un **CRUD (Create, Read, Update, Delete)** completo para gestionar mascotas, construido con TypeScript, Vite y Supabase como backend. Cada archivo está completamente comentado para facilitar el aprendizaje paso a paso.

---

## 📋 Tabla de Contenidos

1. [Requisitos Previos](#-requisitos-previos)
2. [Paso 1: Configurar Supabase](#-paso-1-configurar-supabase)
3. [Paso 2: Crear el Proyecto con Vite](#-paso-2-crear-el-proyecto-con-vite)
4. [Paso 3: Instalar Dependencias](#-paso-3-instalar-dependencias)
5. [Paso 4: Configurar Variables de Entorno](#-paso-4-configurar-variables-de-entorno)
6. [Paso 5: Crear la Estructura de Archivos](#-paso-5-crear-la-estructura-de-archivos)
7. [Paso 6: Explicación de Cada Archivo](#-paso-6-explicación-de-cada-archivo)
8. [Paso 7: Ejecutar la Aplicación](#-paso-7-ejecutar-la-aplicación)
9. [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
10. [Flujo de Datos](#-flujo-de-datos)

---

## 🔧 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior) - [Descargar aquí](https://nodejs.org/)
- **npm** (viene con Node.js)
- Una cuenta en **Supabase** - [Crear cuenta gratis](https://supabase.com/)
- Editor de código (recomendado: **VS Code**)

---

## 🗄️ Paso 1: Configurar Supabase

### 1.1. Crear un nuevo proyecto en Supabase

1. Ingresa a [https://supabase.com/](https://supabase.com/)
2. Haz clic en **"Start your project"** o **"New Project"**
3. Completa los datos:
   - **Name**: `pets-crud` (o el nombre que prefieras)
   - **Database Password**: Crea una contraseña segura (guárdala)
   - **Region**: Selecciona la más cercana a tu ubicación
4. Haz clic en **"Create new project"**
5. Espera unos minutos mientras Supabase crea tu base de datos

### 1.2. Crear la tabla `pets`

1. En el panel izquierdo, haz clic en **"Table Editor"**
2. Haz clic en **"Create a new table"**
3. Configura la tabla:
   - **Name**: `pets`
   - Deja marcado **"Enable Row Level Security (RLS)"** por ahora
4. Define las siguientes columnas:

| Nombre      | Tipo          | Configuración                           |
|-------------|---------------|-----------------------------------------|
| `id`        | `uuid`        | Primary Key, Default value: `gen_random_uuid()` |
| `created_at`| `timestamptz` | Default value: `now()`                  |
| `name`      | `text`        | **Required** (not nullable)             |
| `breed`     | `text`        | Optional (nullable)                     |
| `age`       | `int2`        | Optional (nullable)                     |

5. Haz clic en **"Save"**

### 1.3. Desactivar RLS (solo para desarrollo)

**⚠️ IMPORTANTE**: Para este tutorial desactivaremos RLS. En producción, deberías configurar políticas de seguridad.

1. Ve a **"Authentication"** → **"Policies"**
2. Selecciona la tabla `pets`
3. Haz clic en **"Disable RLS"** o crea una política que permita todas las operaciones

**Alternativa rápida con SQL**:
1. Ve a **"SQL Editor"**
2. Ejecuta el siguiente comando:

```sql
-- Desactivar RLS para la tabla pets (solo para desarrollo)
ALTER TABLE pets DISABLE ROW LEVEL SECURITY;
```

### 1.4. Obtener las credenciales

1. En el panel izquierdo, haz clic en **"Project Settings"** (⚙️)
2. Ve a **"API"**
3. Copia los siguientes valores (los necesitarás luego):
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## 🚀 Paso 2: Crear el Proyecto con Vite

Abre tu terminal y ejecuta:

```bash
# Crear un nuevo proyecto con Vite usando el template de TypeScript
npm create vite@latest crud-pets -- --template vanilla-ts

# Entrar al directorio del proyecto
cd crud-pets
```

**¿Qué hace este comando?**
- `npm create vite@latest`: Usa el generador de Vite para crear un proyecto
- `crud-pets`: Nombre de la carpeta del proyecto
- `--template vanilla-ts`: Usa la plantilla de TypeScript vanilla (sin frameworks)

---

## 📦 Paso 3: Instalar Dependencias

```bash
# Instalar las dependencias base del proyecto (vite, typescript, etc.)
npm install

# Instalar el SDK de Supabase para JavaScript/TypeScript
npm install @supabase/supabase-js
```

---

## 🔐 Paso 4: Configurar Variables de Entorno

Las variables de entorno son valores sensibles (como claves API) que no deben estar en el código.

### 4.1. Crear el archivo `.env`

En la **raíz del proyecto** (donde está `package.json`), crea un archivo llamado `.env`:

```bash
touch .env
```

### 4.2. Agregar las credenciales de Supabase

Abre el archivo `.env` y agrega:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxxxxxxxxx
```

**⚠️ Reemplaza** los valores con los que copiaste en el [Paso 1.4](#14-obtener-las-credenciales)

**¿Por qué `VITE_` al inicio?**
- Vite solo expone las variables que empiezan con `VITE_` al navegador
- Esto previene que expongas accidentalmente variables sensibles del servidor

### 4.3. Agregar `.env` al `.gitignore`

**MUY IMPORTANTE**: Asegúrate de que el archivo `.gitignore` incluya `.env` para no subirlo a Git:

```gitignore
# Añadir esta línea si no está
.env
```

---

## 📁 Paso 5: Crear la Estructura de Archivos

Tu proyecto debe tener la siguiente estructura:

```
crud-pets/
├── index.html          # Estructura HTML principal
├── package.json        # Dependencias y scripts
├── tsconfig.json       # Configuración de TypeScript
├── .env               # Variables de entorno (NO SUBIR A GIT)
├── .gitignore         # Archivos a ignorar en Git
├── src/
│   ├── main.ts        # Lógica principal del CRUD
│   ├── supabase.ts    # Configuración del cliente Supabase
│   └── style.css      # Estilos de la aplicación
└── public/
    └── vite.svg       # Logo de Vite (opcional)
```

---

## 📝 Paso 6: Explicación de Cada Archivo

### 6.1. `index.html` - La Estructura HTML

Este archivo define la **interfaz de usuario** de la aplicación.

**Puntos clave:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🐾 Gestión de Mascotas</title>
</head>
<body>
  <div id="app">
    <div class="container">
      <h1>🐾 Gestión de Mascotas</h1>
      
      <!-- FORMULARIO: Para crear y editar mascotas -->
      <div class="card">
        <h2>Agregar/Editar Mascota</h2>
        <form id="pet-form">
          <!-- Campo oculto para guardar el ID al editar -->
          <input type="hidden" id="pet-id">
          
          <!-- Campos del formulario -->
          <input type="text" id="name" placeholder="Nombre" required>
          <input type="text" id="breed" placeholder="Raza">
          <input type="number" id="age" placeholder="Edad" min="0">
          
          <!-- Botones de acción -->
          <div class="buttons">
            <button type="submit">Guardar</button>
            <button type="button" id="cancel-btn">Cancelar</button>
          </div>
        </form>
      </div>

      <!-- LISTA: Muestra las mascotas registradas -->
      <div class="card">
        <h2>Lista de Mascotas</h2>
        <div id="pets-list"></div>
      </div>
    </div>
  </div>
  
  <!-- Carga el archivo TypeScript principal como módulo -->
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

**Elementos importantes:**

1. **`<input type="hidden" id="pet-id">`**: Almacena el ID de la mascota cuando estamos editando
2. **`id="pet-form"`**: El formulario que capturamos en JavaScript para el evento `submit`
3. **`id="pets-list"`**: Contenedor donde renderizamos dinámicamente la lista
4. **`<script type="module" src="/src/main.ts">`**: Vite compila automáticamente el TypeScript

---

### 6.2. `src/supabase.ts` - Configuración del Cliente

Este archivo **conecta tu aplicación con Supabase**.

```typescript
// PASO 1: Importar la función para crear el cliente
import { createClient } from '@supabase/supabase-js'

// PASO 2: Leer las variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// PASO 3: Validar que existan
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Faltan las credenciales de Supabase en el archivo .env')
}

// PASO 4: Crear y exportar el cliente
export const supabase = createClient(supabaseUrl, supabaseKey)

// PASO 5: Definir la interfaz TypeScript para una mascota
export interface Pet {
  id?: string           // Opcional: Supabase lo genera automáticamente
  name: string          // Obligatorio
  breed?: string        // Opcional
  age?: number          // Opcional
  created_at?: string   // Opcional: Supabase lo genera automáticamente
}
```

**¿Qué hace cada parte?**

1. **`createClient(url, key)`**: Crea una instancia del cliente de Supabase
2. **`import.meta.env`**: Forma de Vite de acceder a variables de entorno
3. **Validación**: Detiene la app si faltan credenciales (evita errores confusos)
4. **`interface Pet`**: Define la estructura de datos con tipos de TypeScript

---

### 6.3. `src/main.ts` - La Lógica del CRUD

Este es el **corazón de la aplicación**. Contiene todas las operaciones CRUD.

#### **Estructura general:**

```typescript
// 1️⃣ IMPORTS
import './style.css'
import { supabase } from './supabase'
import type { Pet } from './supabase'

// 2️⃣ ESTADO Y REFERENCIAS AL DOM
let editingPet: Pet | null = null
const form = document.getElementById('pet-form') as HTMLFormElement
const petsList = document.getElementById('pets-list') as HTMLDivElement
const cancelBtn = document.getElementById('cancel-btn') as HTMLButtonElement

// 3️⃣ ARRANQUE
loadPets()

// 4️⃣ EVENT LISTENERS
form.addEventListener('submit', handleSubmit)
cancelBtn.addEventListener('click', resetForm)
```

#### **Funciones principales:**

##### **1. `loadPets()` - READ (Leer)**

```typescript
async function loadPets() {
  console.log('Cargando mascotas...')
  
  // Consultar todas las mascotas, ordenadas por fecha de creación
  const { data, error } = await supabase
    .from('pets')              // Tabla
    .select('*')               // Seleccionar todas las columnas
    .order('created_at', { ascending: false })  // Más recientes primero
  
  if (error) {
    console.error('Error:', error)
    petsList.innerHTML = '<p class="empty">Error al cargar mascotas</p>'
    return
  }
  
  console.log('Mascotas cargadas:', data)
  displayPets(data || [])
}
```

**¿Cómo funciona Supabase?**
- `supabase.from('pets')`: Selecciona la tabla
- `.select('*')`: Trae todas las columnas
- `.order('created_at', { ascending: false })`: Ordena por fecha descendente
- `await`: Espera la respuesta de la base de datos
- Retorna `{ data, error }`: Patrón de Supabase para manejar resultados

##### **2. `displayPets()` - RENDER (Mostrar)**

```typescript
function displayPets(pets: Pet[]) {
  // Si no hay mascotas, mostrar mensaje
  if (pets.length === 0) {
    petsList.innerHTML = '<p class="empty">No hay mascotas registradas</p>'
    return
  }
  
  // Generar HTML para cada mascota
  petsList.innerHTML = pets.map(pet => `
    <div class="pet-item">
      <div>
        <strong>${pet.name}</strong>
        ${pet.breed ? ` - ${pet.breed}` : ''}
        ${pet.age ? ` (${pet.age} años)` : ''}
      </div>
      <div class="pet-actions">
        <button class="btn-edit" onclick="editPet('${pet.id}')">Editar</button>
        <button class="btn-delete" onclick="deletePet('${pet.id}')">Eliminar</button>
      </div>
    </div>
  `).join('')
}
```

**Detalles importantes:**
- `.map()`: Transforma cada mascota en HTML
- **Operador ternario** `pet.breed ? ... : ''`: Solo muestra si existe
- **Template literals** `` `string ${variable}` ``: Insertar variables en texto
- `.join('')`: Convierte el array de strings en uno solo

##### **3. `handleSubmit()` - CREATE / UPDATE**

```typescript
async function handleSubmit(e: Event) {
  e.preventDefault()  // Evita que el formulario recargue la página
  
  // Obtener valores del formulario
  const name = (document.getElementById('name') as HTMLInputElement).value
  const breed = (document.getElementById('breed') as HTMLInputElement).value
  const ageInput = (document.getElementById('age') as HTMLInputElement).value
  const age = ageInput ? parseInt(ageInput) : undefined
  
  // Construir objeto según la interfaz Pet
  const petData: Pet = { 
    name, 
    breed: breed || undefined,
    age
  }
  
  let result
  
  // ¿Estamos editando o creando?
  if (editingPet?.id) {
    // UPDATE: Actualizar mascota existente
    result = await supabase
      .from('pets')
      .update(petData)
      .eq('id', editingPet.id)  // WHERE id = editingPet.id
    
    console.log('Mascota actualizada')
  } else {
    // CREATE: Insertar nueva mascota
    result = await supabase
      .from('pets')
      .insert([petData])
    
    console.log('Mascota creada')
  }
  
  if (result.error) {
    console.error('Error:', result.error)
    alert('Error al guardar la mascota')
    return
  }
  
  // Limpiar formulario y recargar lista
  resetForm()
  loadPets()
}
```

**Conceptos clave:**
- **`e.preventDefault()`**: Evita el comportamiento por defecto (recargar página)
- **Type casting** `as HTMLInputElement`: Le dice a TypeScript el tipo exacto
- **`.eq('id', value)`**: Equivalente a `WHERE id = value` en SQL
- **`.insert([data])`**: Inserta uno o más registros (array)
- **`.update(data)`**: Actualiza campos especificados

##### **4. `editPet()` - PREPARAR EDICIÓN**

```typescript
(window as any).editPet = async (id: string) => {
  console.log('Editando mascota:', id)
  
  // Buscar la mascota por ID
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('id', id)
    .single()  // Retorna un objeto en lugar de un array
  
  if (error) {
    console.error('Error:', error)
    alert('Error al cargar la mascota')
    return
  }
  
  // Guardar en el estado
  editingPet = data
  
  // Llenar el formulario con los datos
  ;(document.getElementById('pet-id') as HTMLInputElement).value = id
  ;(document.getElementById('name') as HTMLInputElement).value = data.name
  ;(document.getElementById('breed') as HTMLInputElement).value = data.breed || ''
  ;(document.getElementById('age') as HTMLInputElement).value = data.age?.toString() || ''
  
  // Hacer scroll al formulario
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
```

**¿Por qué `(window as any).editPet`?**
- Los botones usan `onclick="editPet('id')"` en el HTML
- Para que funcione desde el HTML, debe estar en el objeto `window`
- `as any` evita errores de tipos de TypeScript

##### **5. `deletePet()` - DELETE (Eliminar)**

```typescript
(window as any).deletePet = async (id: string) => {
  // Confirmar antes de eliminar
  if (!confirm('¿Eliminar esta mascota?')) return
  
  console.log('Eliminando mascota:', id)
  
  // Eliminar de la base de datos
  const { error } = await supabase
    .from('pets')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error:', error)
    alert('Error al eliminar la mascota')
    return
  }
  
  console.log('Mascota eliminada')
  loadPets()  // Recargar lista
}
```

**Detalles:**
- **`confirm()`**: Muestra un cuadro de diálogo nativo del navegador
- **`.delete().eq('id', id)`**: Elimina el registro que coincida con el ID

---

### 6.4. `src/style.css` - Estilos de la Aplicación

Este archivo contiene todos los estilos CSS de la aplicación.

**Puntos destacados:**

```css
/* Reseteo para control total */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Contenedor centrado con ancho máximo */
.container {
  max-width: 800px;
  margin: 0 auto;
}

/* Tarjetas con sombra */
.card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Formulario con flexbox */
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Botones con colores distintivos */
.btn-edit {
  background: #2196F3;  /* Azul para editar */
}

.btn-delete {
  background: #f44336;  /* Rojo para eliminar */
}
```

**Técnicas CSS utilizadas:**
1. **Flexbox**: Para alinear elementos (formularios, botones)
2. **Box-shadow**: Para dar profundidad a las tarjetas
3. **Border-radius**: Para esquinas redondeadas
4. **Pseudo-clases** (`:hover`): Para efectos al pasar el mouse

---

### 6.5. `package.json` - Configuración del Proyecto

Define las dependencias y scripts del proyecto.

```json
{
  "name": "crud-pets",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",                    // Servidor de desarrollo
    "build": "tsc && vite build",     // Compilar para producción
    "preview": "vite preview"         // Vista previa del build
  },
  "devDependencies": {
    "typescript": "~5.9.3",           // Compilador TypeScript
    "vite": "^7.1.7"                  // Build tool
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.76.1"  // SDK de Supabase
  }
}
```

**Scripts disponibles:**
- `npm run dev`: Inicia servidor de desarrollo con hot-reload
- `npm run build`: Compila para producción
- `npm run preview`: Sirve la versión compilada

---

### 6.6. `tsconfig.json` - Configuración de TypeScript

Define cómo TypeScript compilará el código.

```json
{
  "compilerOptions": {
    "target": "ES2022",                 // Versión de JavaScript objetivo
    "module": "ESNext",                 // Sistema de módulos
    "lib": ["ES2022", "DOM"],           // APIs disponibles
    "strict": true,                     // Modo estricto (recomendado)
    "moduleResolution": "bundler",      // Para Vite
    "noEmit": true                      // Vite maneja la compilación
  },
  "include": ["src"]                    // Solo compilar archivos en src/
}
```

**Opciones importantes:**
- **`strict: true`**: Activa todas las comprobaciones estrictas de tipos
- **`noEmit: true`**: TypeScript solo verifica tipos, Vite compila
- **`DOM` en lib**: Permite usar `document`, `window`, etc.

---

## 🏃 Paso 7: Ejecutar la Aplicación

### 7.1. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Verás algo como:

```
VITE v7.1.7  ready in 523 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 7.2. Abrir en el navegador

1. Abre tu navegador
2. Ve a `http://localhost:5173/`
3. Deberías ver la aplicación funcionando

### 7.3. Probar las funcionalidades

1. **Crear**: Llena el formulario y haz clic en "Guardar"
2. **Leer**: La lista se actualiza automáticamente
3. **Actualizar**: Haz clic en "Editar", modifica los datos y guarda
4. **Eliminar**: Haz clic en "Eliminar" y confirma

---

## 🏗️ Arquitectura del Proyecto

```
┌─────────────────┐
│   index.html    │  ← Estructura HTML (UI)
└────────┬────────┘
         │
         ├─── Carga ───→ main.ts (Lógica)
         │                  │
         └─── Carga ───→ style.css (Estilos)
                            │
                            ├─── Importa ───→ supabase.ts
                            │                      │
                            │                      └─── Conecta con ───→ Supabase (Backend)
                            │                                             ├─── Tabla: pets
                            │                                             └─── Operaciones:
                            │                                                  • SELECT
                            │                                                  • INSERT
                            │                                                  • UPDATE
                            │                                                  • DELETE
```

---

## 🔄 Flujo de Datos

### Flujo de CREATE (Crear):
```
Usuario llena formulario
      ↓
handleSubmit() captura el evento
      ↓
Extrae datos del formulario
      ↓
supabase.from('pets').insert([data])
      ↓
Supabase guarda en la base de datos
      ↓
resetForm() limpia el formulario
      ↓
loadPets() recarga la lista
      ↓
displayPets() renderiza la lista actualizada
```

### Flujo de UPDATE (Actualizar):
```
Usuario hace clic en "Editar"
      ↓
editPet(id) busca la mascota
      ↓
Llena el formulario con los datos
      ↓
Usuario modifica y guarda
      ↓
handleSubmit() detecta que editingPet existe
      ↓
supabase.from('pets').update(data).eq('id', id)
      ↓
Supabase actualiza el registro
      ↓
resetForm() y loadPets()
```

### Flujo de DELETE (Eliminar):
```
Usuario hace clic en "Eliminar"
      ↓
deletePet(id) pide confirmación
      ↓
supabase.from('pets').delete().eq('id', id)
      ↓
Supabase elimina el registro
      ↓
loadPets() recarga la lista
```

---

## 📚 Conceptos Clave Aprendidos

### 1️⃣ **TypeScript**
- Tipos e interfaces (`interface Pet`)
- Type casting (`as HTMLInputElement`)
- Tipos opcionales (`id?: string`)
- Async/await para promesas

### 2️⃣ **Supabase**
- Crear cliente (`createClient`)
- Operaciones CRUD:
  - `select()` → Leer
  - `insert()` → Crear
  - `update()` → Actualizar
  - `delete()` → Eliminar
- Filtros (`eq`, `order`)
- Manejo de errores (`{ data, error }`)

### 3️⃣ **Vite**
- Configuración con `vite.config.ts`
- Variables de entorno (`import.meta.env`)
- Hot Module Replacement (HMR)
- Build para producción

### 4️⃣ **JavaScript Moderno**
- Template literals
- Destructuring (`const { data, error }`)
- Arrow functions
- Array methods (`.map()`, `.join()`)
- Optional chaining (`pet.age?.toString()`)
- Nullish coalescing (`data || []`)

### 5️⃣ **DOM Manipulation**
- `getElementById()`
- Event listeners (`addEventListener`)
- `innerHTML` para renderizado dinámico
- Prevenir comportamiento por defecto (`preventDefault()`)

### 6️⃣ **CSS**
- Flexbox para layouts
- Variables CSS (aunque no se usaron aquí, son recomendables)
- Pseudo-clases (`:hover`, `:focus`)
- Box model

---

## 🚨 Errores Comunes y Soluciones

### Error: "Faltan las credenciales de Supabase"
**Solución**: Verifica que:
1. El archivo `.env` existe en la raíz
2. Las variables empiezan con `VITE_`
3. Reiniciaste el servidor después de crear `.env`

### Error: "Cannot read properties of null"
**Solución**: Verifica que los `id` en el HTML coincidan con los del TypeScript:
- `id="pet-form"` en HTML
- `getElementById('pet-form')` en TypeScript

### Error: "Module not found: @supabase/supabase-js"
**Solución**: Ejecuta `npm install @supabase/supabase-js`

### No se muestran las mascotas
**Solución**:
1. Abre la consola del navegador (F12)
2. Revisa si hay errores
3. Verifica que desactivaste RLS en Supabase
4. Comprueba que la tabla se llama `pets` (plural)

---

## 🎯 Próximos Pasos

Para seguir aprendiendo, puedes:

1. **Agregar más campos**: Fotos, dueño, historial médico
2. **Implementar búsqueda**: Filtrar mascotas por nombre o raza
3. **Agregar paginación**: Si tienes muchas mascotas
4. **Implementar RLS**: Configurar políticas de seguridad en Supabase
5. **Agregar validaciones**: Validar datos antes de enviar
6. **Subir imágenes**: Usar Supabase Storage
7. **Implementar autenticación**: Login con email/contraseña
8. **Migrar a un framework**: React, Vue o Svelte

---

## 📖 Recursos Adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs/)
- [Documentación de Vite](https://vitejs.dev/guide/)
- [MDN Web Docs (JavaScript)](https://developer.mozilla.org/)
- [CSS Tricks (Flexbox)](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

---

## 🤝 Créditos

Tutorial creado para fines educativos.

Si tienes preguntas o encuentras errores, no dudes en preguntar.

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso educativo.

---

**¡Felicidades! 🎉** Has creado un CRUD completo con TypeScript y Supabase.

