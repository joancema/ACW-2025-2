# 🐾 CRUD Simple con TypeScript y Supabase - Tutorial 90 Minutos

## 🎯 Objetivo
Crear un CRUD funcional en **90 minutos** con TypeScript, Vite y Supabase para gestionar mascotas. Partiendo de un proyecto Vite ya configurado.

## 📋 Requisitos Previos
- Node.js instalado (v18 o superior)
- Cuenta en [Supabase](https://supabase.com) (gratis)
- Editor de código (VS Code recomendado)

## 📁 Estructura del Proyecto
```
crud-pets/
├── public/              # Archivos estáticos (generado por Vite)
├── src/
│   ├── supabase.ts     # Configuración de Supabase
│   ├── main.ts         # Lógica principal de la app
│   ├── style.css       # Estilos de la aplicación
│   └── vite-env.d.ts   # Tipos de Vite (generado)
├── index.html          # HTML principal
├── package.json        # Dependencias
├── tsconfig.json       # Config TypeScript (generado por Vite)
├── vite.config.ts      # Config Vite (opcional)
└── .env               # Variables de entorno
```

---

## ⏱️ CRONOGRAMA SUGERIDO (90 minutos)

| Tiempo | Tarea |
|--------|-------|
| 0-5 min | Crear proyecto con Vite |
| 5-15 min | Configurar Supabase (crear tabla y políticas) |
| 15-20 min | Instalar Supabase y configurar cliente |
| 20-25 min | Modificar HTML (solo 3 inputs) |
| 25-35 min | Actualizar CSS (minimalista) |
| 35-70 min | Escribir lógica TypeScript (CRUD simplificado) |
| 70-90 min | Probar, depurar y ajustes finales |

---

## 🚀 PASO 1: CREAR PROYECTO CON VITE (0-5 min)

### 1.1 Crear proyecto usando el template de Vite
```bash
npm create vite@latest crud-pets -- --template vanilla-ts
cd crud-pets
npm install
```

Esto genera automáticamente:
- ✅ `package.json` con scripts configurados
- ✅ `tsconfig.json` con configuración TypeScript optimizada
- ✅ `index.html` con estructura básica
- ✅ `src/main.ts` archivo principal
- ✅ `src/style.css` estilos base
- ✅ `src/vite-env.d.ts` tipos de Vite
- ✅ `.gitignore` configurado correctamente
- ✅ Configuración de Vite lista para usar

### 1.2 Verificar que funciona
```bash
npm run dev
```

Deberías ver el proyecto corriendo en `http://localhost:5173` con un contador de ejemplo.

### 1.3 Estructura inicial generada
```
crud-pets/
├── node_modules/
├── public/
├── src/
│   ├── counter.ts          # Ejemplo (puedes eliminar)
│   ├── main.ts             # ⚠️ Lo modificaremos
│   ├── style.css           # ⚠️ Lo modificaremos
│   ├── typescript.svg      # Ejemplo (puedes eliminar)
│   └── vite-env.d.ts       # Tipos de Vite
├── .gitignore              # ✅ Ya configurado
├── index.html              # ⚠️ Lo modificaremos
├── package.json
└── tsconfig.json
```

---

## 🗄️ PASO 2: CONFIGURAR SUPABASE (5-15 min)

### 2.1 Crear proyecto en Supabase
1. Ir a [https://supabase.com](https://supabase.com)
2. Crear cuenta/proyecto gratuito
3. Ir a **Settings → API**
4. Copiar la **Project URL** y **anon public** key

---

## 🗄️ PASO 2: CONFIGURAR SUPABASE (5-15 min)

### 2.1 Crear proyecto en Supabase
1. Ir a [https://supabase.com](https://supabase.com)
2. Crear cuenta/proyecto gratuito
3. Ir a **Settings → API**
4. Copiar la **Project URL** y **anon public** key

### 2.2 Instalar cliente de Supabase
```bash
npm install @supabase/supabase-js
```

### 2.3 Crear archivo `.env` en la raíz del proyecto
```env
VITE_SUPABASE_URL=tu_url_aqui
VITE_SUPABASE_ANON_KEY=tu_key_aqui
```

> **Nota:** Vite requiere el prefijo `VITE_` para que las variables sean accesibles en el cliente.

> **⚠️ IMPORTANTE:** El template de Vite ya incluye `.env` en el `.gitignore`, así que tus credenciales NO se subirán a Git por error.

### 2.4 Crear tabla en Supabase
Ir al **SQL Editor** de Supabase y ejecutar:

```sql
-- Tabla de Mascotas - SUPER SIMPLE (solo 3 campos)
CREATE TABLE pets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  breed VARCHAR(100),
  age INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Habilitar acceso público (para desarrollo)
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Acceso público" ON pets 
FOR ALL USING (true);

-- Datos de ejemplo (opcional)
INSERT INTO pets (name, breed, age) VALUES
  ('Max', 'Labrador', 3),
  ('Luna', 'Siamés', 2),
  ('Rocky', 'Bulldog', 5),
  ('Michi', 'Persa', 1);
```

---

## 📄 PASO 3: MODIFICAR HTML (15-25 min)

### 3.1 Reemplazar el contenido de `index.html`

Vite genera un HTML básico, vamos a reemplazarlo completamente:

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
      
      <!-- Formulario -->
      <div class="card">
        <h2>Agregar/Editar Mascota</h2>
        <form id="pet-form">
          <input type="hidden" id="pet-id">
          <input type="text" id="name" placeholder="Nombre" required>
          <input type="text" id="breed" placeholder="Raza">
          <input type="number" id="age" placeholder="Edad" min="0">
          <div class="buttons">
            <button type="submit">Guardar</button>
            <button type="button" id="cancel-btn">Cancelar</button>
          </div>
        </form>
      </div>

      <!-- Lista de mascotas -->
      <div class="card">
        <h2>Lista de Mascotas</h2>
        <div id="pets-list"></div>
      </div>
    </div>
  </div>
  
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

> **Nota:** Mantén la línea `<script type="module" src="/src/main.ts"></script>` que viene por defecto en Vite.

---

## 🎨 PASO 4: ACTUALIZAR CSS (25-35 min)

### 4.1 Reemplazar el contenido de `src/style.css`

CSS minimalista - solo lo esencial:

```css
/* Reset básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, sans-serif;
  background: #f5f5f5;
  padding: 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

h2 {
  margin-bottom: 15px;
  color: #555;
  font-size: 1.2em;
}

/* Tarjetas */
.card {
  background: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Formulario */
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

input:focus {
  outline: none;
  border-color: #4CAF50;
}

/* Botones */
.buttons {
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  flex: 1;
}

button[type="submit"] {
  background: #4CAF50;
  color: white;
}

button[type="submit"]:hover {
  background: #45a049;
}

#cancel-btn {
  background: #f0f0f0;
  color: #333;
}

#cancel-btn:hover {
  background: #e0e0e0;
}

/* Lista de mascotas */
.pet-item {
  padding: 15px;
  margin: 10px 0;
  background: #fafafa;
  border-left: 3px solid #4CAF50;
  border-radius: 4px;
}

.pet-item strong {
  color: #333;
}

.pet-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.btn-edit {
  background: #2196F3;
  color: white;
}

.btn-edit:hover {
  background: #0b7dda;
}

.btn-delete {
  background: #f44336;
  color: white;
}

.btn-delete:hover {
  background: #da190b;
}

.empty {
  text-align: center;
  color: #999;
  padding: 20px;
}
```

---

## 💻 PASO 5: CREAR LÓGICA TYPESCRIPT (35-75 min)

### 5.1 Crear archivo **nuevo**: `src/supabase.ts`

Este archivo no existe en el template de Vite, debemos crearlo:

```typescript
// Configuración del cliente de Supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Faltan las credenciales de Supabase en el archivo .env')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Tipo para Mascota (solo 3 campos)
export interface Pet {
  id?: string
  name: string
  breed?: string
  age?: number
  created_at?: string
}
```

### 5.2 Reemplazar completamente `src/main.ts`

Vite genera un archivo `main.ts` con código de ejemplo. Vamos a reemplazarlo con nuestra lógica:

```typescript
import './style.css'
import { supabase, Pet } from './supabase'

// Variables globales
let editingPet: Pet | null = null
const form = document.getElementById('pet-form') as HTMLFormElement
const petsList = document.getElementById('pets-list') as HTMLDivElement
const cancelBtn = document.getElementById('cancel-btn') as HTMLButtonElement

// Cargar mascotas al iniciar
loadPets()

// Event Listeners
form.addEventListener('submit', handleSubmit)
cancelBtn.addEventListener('click', resetForm)

// FUNCIONES PRINCIPALES

async function loadPets() {
  console.log('Cargando mascotas...')
  
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error:', error)
    petsList.innerHTML = '<p class="empty">Error al cargar mascotas</p>'
    return
  }
  
  console.log('Mascotas cargadas:', data)
  displayPets(data || [])
}

function displayPets(pets: Pet[]) {
  if (pets.length === 0) {
    petsList.innerHTML = '<p class="empty">No hay mascotas registradas</p>'
    return
  }
  
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

async function handleSubmit(e: Event) {
  e.preventDefault()
  
  const name = (document.getElementById('name') as HTMLInputElement).value
  const breed = (document.getElementById('breed') as HTMLInputElement).value
  const ageInput = (document.getElementById('age') as HTMLInputElement).value
  const age = ageInput ? parseInt(ageInput) : undefined
  
  const petData: Pet = { 
    name, 
    breed: breed || undefined,
    age
  }
  
  console.log('Guardando mascota:', petData)
  
  let result
  
  if (editingPet?.id) {
    // Actualizar
    result = await supabase
      .from('pets')
      .update(petData)
      .eq('id', editingPet.id)
    
    console.log('Mascota actualizada')
  } else {
    // Crear
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
  
  resetForm()
  loadPets()
}

function resetForm() {
  form.reset()
  editingPet = null
  ;(document.getElementById('pet-id') as HTMLInputElement).value = ''
  console.log('Formulario reseteado')
}

// Funciones globales (accesibles desde los botones del HTML)
(window as any).editPet = async (id: string) => {
  console.log('Editando mascota:', id)
  
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error:', error)
    alert('Error al cargar la mascota')
    return
  }
  
  editingPet = data
  ;(document.getElementById('pet-id') as HTMLInputElement).value = id
  ;(document.getElementById('name') as HTMLInputElement).value = data.name
  ;(document.getElementById('breed') as HTMLInputElement).value = data.breed || ''
  ;(document.getElementById('age') as HTMLInputElement).value = data.age?.toString() || ''
  
  // Scroll al formulario
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

(window as any).deletePet = async (id: string) => {
  if (!confirm('¿Eliminar esta mascota?')) return
  
  console.log('Eliminando mascota:', id)
  
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
  loadPets()
}
```

---

## ✅ PASO 6: PROBAR LA APLICACIÓN (75-90 min)

### 6.1 Ejecutar el proyecto
```bash
npm run dev
```

### 6.2 Abrir en el navegador
- Ir a `http://localhost:5173` (puerto por defecto de Vite)
- Abrir la consola del navegador (F12)

### 6.3 Probar funcionalidades
1. ✅ Crear una mascota nueva
2. ✅ Ver lista de mascotas cargadas desde Supabase
3. ✅ Editar una mascota existente
4. ✅ Eliminar una mascota
5. ✅ Verificar que los campos opcionales funcionen correctamente
6. ✅ Verificar logs en consola para detectar errores

### 6.4 Checklist de funcionamiento
- [ ] El formulario se envía correctamente
- [ ] Las mascotas se muestran en la lista
- [ ] El botón editar carga los datos en el formulario
- [ ] El botón eliminar pide confirmación
- [ ] El botón cancelar limpia el formulario
- [ ] Los datos se reflejan en Supabase

---

## 🐛 PASO 7: SOLUCIÓN DE PROBLEMAS COMUNES

### Error: "Failed to fetch"
- Verificar que las credenciales en `.env` sean correctas
- Verificar que la URL de Supabase no tenga espacios extras
- Reiniciar el servidor de desarrollo (`npm run dev`)

### Error: "Table 'pets' not found"
- Ejecutar el script SQL completo en Supabase
- Verificar que las políticas RLS estén activas
- Refrescar la página del SQL Editor

### Las mascotas no se muestran
- Abrir la consola del navegador (F12)
- Verificar si hay errores en rojo
- Verificar que haya datos en la tabla de Supabase
- Comprobar que las credenciales sean correctas

### El formulario no se envía
- Verificar que todos los campos requeridos estén llenos
- Revisar la consola para ver mensajes de error
- Verificar la conexión a Internet

---

## 📝 RESUMEN DE ARCHIVOS

### Archivos generados automáticamente por Vite:
- `package.json` - Configuración del proyecto
- `tsconfig.json` - Configuración TypeScript
- `index.html` - Estructura HTML (modificado por ti)
- `src/style.css` - Estilos (modificado por ti)
- `src/main.ts` - Lógica principal (modificado por ti)
- `src/vite-env.d.ts` - Tipos de Vite

### Archivos que TÚ creas:
- `.env` - Variables de entorno (credenciales Supabase) ⚠️ No subir a Git
- `src/supabase.ts` - Cliente y tipos de Supabase

### Total: 
- **6 archivos generados por Vite** (3 los modificas)
- **2 archivos nuevos** que tú creas
- **1 tabla en Supabase**

---

## 🎯 CONCEPTOS APRENDIDOS

- ✅ Configuración de TypeScript con Vite
- ✅ Conexión con Supabase
- ✅ Operaciones CRUD completas (Create, Read, Update, Delete)
- ✅ Async/Await para operaciones asíncronas
- ✅ Manejo del DOM con TypeScript
- ✅ Tipos e interfaces en TypeScript
- ✅ Validación de formularios HTML5
- ✅ Políticas de seguridad RLS en Supabase

---

## 🚀 SIGUIENTES PASOS (Después de los 90 minutos)

Una vez que funcione esta versión, puedes mejorarla agregando:

### Funcionalidades
1. **Búsqueda y filtros** - Buscar mascotas por nombre o especie
2. **Imágenes** - Añadir fotos de las mascotas
3. **Categorías** - Organizar por tipo de mascota
4. **Historial médico** - Registrar vacunas y visitas al veterinario
5. **Dueños** - Asociar mascotas con sus propietarios

### Mejoras técnicas
6. **Autenticación** - Login de usuarios con Supabase Auth
7. **Validaciones avanzadas** - Validar edad, nombre, etc.
8. **Notificaciones toast** - Mensajes visuales de éxito/error
9. **Modales** - Ventanas emergentes para confirmaciones
10. **Paginación** - Cargar mascotas en páginas
11. **Modo oscuro** - Tema claro/oscuro
12. **Responsive mejorado** - Optimizar para móviles

---

## 💡 TIPS FINALES

- **Mantén la consola abierta** - Te ayudará a detectar errores rápidamente
- **Guarda frecuentemente** - Usa Ctrl+S después de cada cambio
- **Prueba paso a paso** - No esperes al final para probar todo
- **Lee los mensajes de error** - La consola te dice exactamente qué falló
- **Comienza simple** - Primero hazlo funcionar, luego hazlo bonito
- **Usa los datos de ejemplo** - Te ayudarán a visualizar cómo se ve la app

---

## 📚 Recursos Adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Guía de Vite](https://vitejs.dev/guide/)

---

¡Listo! Sigue este README paso a paso y tendrás tu sistema de gestión de mascotas funcionando en 90 minutos. 🐾✨