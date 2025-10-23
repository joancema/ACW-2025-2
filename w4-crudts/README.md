# 📚 CRUD Simple con TypeScript y Supabase - Tutorial 90 Minutos

## 🎯 Objetivo
Crear un CRUD funcional en **90 minutos** con TypeScript, Vite y Supabase. Versión súper simplificada para aprender los conceptos básicos.

## 📋 Requisitos Previos
- Node.js instalado
- Cuenta en [Supabase](https://supabase.com) (gratis)
- Editor de código (VS Code recomendado)

## 📁 Estructura del Proyecto
```
crud-simple/
├── src/
│   ├── supabase.ts    # Configuración de Supabase
│   ├── main.ts        # Toda la lógica
│   └── style.css      # Estilos mínimos
├── index.html         # HTML principal
├── package.json       # Dependencias
├── tsconfig.json      # Config TypeScript
├── vite.config.ts     # Config Vite
└── .env              # Variables de entorno
```

---

## ⏱️ CRONOGRAMA SUGERIDO (90 minutos)

| Tiempo | Tarea |
|--------|-------|
| 0-10 min | Configuración inicial y archivos base |
| 10-20 min | Configurar Supabase |
| 20-30 min | Escribir HTML |
| 30-40 min | Escribir CSS |
| 40-60 min | Escribir lógica TypeScript |
| 60-85 min | Probar y depurar |
| 85-90 min | Ajustes finales |

---

## 🚀 PASO 1: CONFIGURACIÓN INICIAL (0-10 min)

### 1.1 Crear estructura de carpetas
```bash
mkdir crud-simple
cd crud-simple
mkdir src
```

### 1.2 Crear archivo: `package.json`
```json
{
  "name": "crud-simple",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0"
  },
  "devDependencies": {
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}
```

### 1.3 Crear archivo: `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "noEmit": true,
    "strict": true
  },
  "include": ["src"]
}
```

### 1.4 Crear archivo: `vite.config.ts`
```typescript
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000
  }
})
```

### 1.5 Instalar dependencias
```bash
npm install
```

---

## 🗄️ PASO 2: CONFIGURAR SUPABASE (10-20 min)

### 2.1 Crear proyecto en Supabase
1. Ir a [https://supabase.com](https://supabase.com)
2. Crear cuenta/proyecto gratuito
3. Guardar la **URL** y **ANON KEY** del proyecto

### 2.2 Crear archivo: `.env`
```env
VITE_SUPABASE_URL=tu_url_aqui
VITE_SUPABASE_ANON_KEY=tu_key_aqui
```

### 2.3 Crear tabla en Supabase
Ir al **SQL Editor** de Supabase y ejecutar:

```sql
-- Tabla SUPER SIMPLE - Solo 3 campos!
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Habilitar acceso público (para desarrollo)
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Acceso público" ON tasks 
FOR ALL USING (true);

-- Datos de ejemplo (opcional)
INSERT INTO tasks (title, description) VALUES
  ('Comprar pan', 'Ir a la panadería'),
  ('Estudiar TypeScript', 'Repasar conceptos básicos'),
  ('Hacer ejercicio', 'Salir a correr 30 minutos');
```

---

## 📄 PASO 3: CREAR HTML (20-30 min)

### Crear archivo: `index.html`
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CRUD Simple</title>
  <link rel="stylesheet" href="/src/style.css">
</head>
<body>
  <div class="container">
    <h1>📝 CRUD Simple - Tareas</h1>
    
    <!-- Formulario -->
    <div class="form-container">
      <h2>Agregar/Editar Tarea</h2>
      <form id="task-form">
        <input type="hidden" id="task-id">
        <input type="text" id="title" placeholder="Título" required>
        <textarea id="description" placeholder="Descripción"></textarea>
        <div class="buttons">
          <button type="submit">Guardar</button>
          <button type="button" id="cancel-btn">Cancelar</button>
        </div>
      </form>
    </div>

    <!-- Lista de tareas -->
    <div class="list-container">
      <h2>Lista de Tareas</h2>
      <div id="tasks-list">
        <!-- Las tareas se cargarán aquí -->
      </div>
    </div>
  </div>

  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

---

## 🎨 PASO 4: CREAR CSS (30-40 min)

### Crear archivo: `src/style.css`
```css
/* CSS SUPER SIMPLE - Solo lo esencial */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background: #f0f0f0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #333;
}

.form-container, .list-container {
  background: white;
  padding: 20px;
  margin: 20px 0;
  border-radius: 5px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input, textarea, button {
  padding: 10px;
  font-size: 16px;
}

.buttons {
  display: flex;
  gap: 10px;
}

button {
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 3px;
}

button:hover {
  background: #0056b3;
}

.task-item {
  padding: 15px;
  margin: 10px 0;
  background: #f8f9fa;
  border-left: 3px solid #007bff;
}

.task-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.task-description {
  color: #666;
  margin-bottom: 10px;
}

.task-actions {
  display: flex;
  gap: 10px;
}

.btn-edit {
  background: #28a745;
}

.btn-delete {
  background: #dc3545;
}
```

---

## 💻 PASO 5: CREAR LÓGICA TYPESCRIPT (40-60 min)

### 5.1 Crear archivo: `src/supabase.ts`
```typescript
// Configuración SIMPLE de Supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Tipo simple para Tarea
export interface Task {
  id?: string
  title: string
  description?: string
  created_at?: string
}
```

### 5.2 Crear archivo: `src/main.ts`
```typescript
// TODA la lógica en un solo archivo
import { supabase, Task } from './supabase'

// Variables globales
let editingTask: Task | null = null
const form = document.getElementById('task-form') as HTMLFormElement
const tasksList = document.getElementById('tasks-list') as HTMLDivElement
const cancelBtn = document.getElementById('cancel-btn') as HTMLButtonElement

// Cargar tareas al iniciar
loadTasks()

// Event Listeners
form.addEventListener('submit', handleSubmit)
cancelBtn.addEventListener('click', resetForm)

// FUNCIONES PRINCIPALES

async function loadTasks() {
  console.log('Cargando tareas...')
  
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error:', error)
    tasksList.innerHTML = '<p>Error al cargar tareas</p>'
    return
  }
  
  console.log('Tareas cargadas:', data)
  displayTasks(data || [])
}

function displayTasks(tasks: Task[]) {
  if (tasks.length === 0) {
    tasksList.innerHTML = '<p>No hay tareas</p>'
    return
  }
  
  tasksList.innerHTML = tasks.map(task => `
    <div class="task-item">
      <div class="task-title">${task.title}</div>
      <div class="task-description">${task.description || 'Sin descripción'}</div>
      <div class="task-actions">
        <button class="btn-edit" onclick="editTask('${task.id}')">Editar</button>
        <button class="btn-delete" onclick="deleteTask('${task.id}')">Eliminar</button>
      </div>
    </div>
  `).join('')
}

async function handleSubmit(e: Event) {
  e.preventDefault()
  
  const title = (document.getElementById('title') as HTMLInputElement).value
  const description = (document.getElementById('description') as HTMLTextAreaElement).value
  
  const taskData: Task = { title, description }
  
  console.log('Guardando:', taskData)
  
  let result
  
  if (editingTask?.id) {
    // Actualizar
    result = await supabase
      .from('tasks')
      .update(taskData)
      .eq('id', editingTask.id)
    
    console.log('Tarea actualizada')
  } else {
    // Crear
    result = await supabase
      .from('tasks')
      .insert([taskData])
    
    console.log('Tarea creada')
  }
  
  if (result.error) {
    console.error('Error:', result.error)
    return
  }
  
  resetForm()
  loadTasks()
}

function resetForm() {
  form.reset()
  editingTask = null
  ;(document.getElementById('task-id') as HTMLInputElement).value = ''
  console.log('Formulario reseteado')
}

// Funciones globales (las más simple posible)
(window as any).editTask = async (id: string) => {
  console.log('Editando tarea:', id)
  
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error:', error)
    return
  }
  
  editingTask = data
  ;(document.getElementById('task-id') as HTMLInputElement).value = id
  ;(document.getElementById('title') as HTMLInputElement).value = data.title
  ;(document.getElementById('description') as HTMLTextAreaElement).value = data.description || ''
}

(window as any).deleteTask = async (id: string) => {
  if (!confirm('¿Eliminar tarea?')) return
  
  console.log('Eliminando tarea:', id)
  
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error:', error)
    return
  }
  
  console.log('Tarea eliminada')
  loadTasks()
}
```

---

## ✅ PASO 6: PROBAR LA APLICACIÓN (60-85 min)

### 6.1 Ejecutar el proyecto
```bash
npm run dev
```

### 6.2 Abrir en el navegador
- Ir a `http://localhost:3000`
- Abrir la consola del navegador (F12)

### 6.3 Probar funcionalidades
1. ✅ Crear una tarea nueva
2. ✅ Ver lista de tareas
3. ✅ Editar una tarea
4. ✅ Eliminar una tarea
5. ✅ Verificar logs en consola

---

## 🐛 PASO 7: SOLUCIÓN DE PROBLEMAS COMUNES

### Error: "Failed to fetch"
- Verificar que las credenciales en `.env` sean correctas
- Verificar que la tabla `tasks` exista en Supabase

### Error: "Table 'tasks' not found"
- Ejecutar el script SQL en Supabase
- Verificar que las políticas RLS estén activas

### Las tareas no se muestran
- Verificar la consola del navegador
- Verificar que haya datos en la tabla

---

## 📝 RESUMEN DE ARCHIVOS

Total: **8 archivos** (incluyendo `.env`)

1. `package.json` - Configuración del proyecto
2. `tsconfig.json` - Configuración TypeScript
3. `vite.config.ts` - Configuración Vite
4. `.env` - Variables de entorno
5. `index.html` - Estructura HTML
6. `src/style.css` - Estilos básicos
7. `src/supabase.ts` - Configuración Supabase
8. `src/main.ts` - Toda la lógica

---

## 🎯 CONCEPTOS APRENDIDOS

- ✅ Configuración de TypeScript con Vite
- ✅ Conexión con Supabase
- ✅ Operaciones CRUD básicas
- ✅ Async/Await
- ✅ Manejo del DOM con TypeScript
- ✅ Tipos e interfaces básicas

---

## 🚀 SIGUIENTES PASOS (Después de los 90 minutos)

Una vez que funcione esta versión simple, puedes agregar:

1. Validaciones de formulario
2. Mejores estilos CSS
3. Notificaciones visuales
4. Modales personalizados
5. Paginación
6. Búsqueda y filtros
7. Autenticación de usuarios

---

## 💡 TIPS FINALES

- **Mantén la consola abierta** para ver los logs
- **Guarda frecuentemente** (Ctrl+S)
- **Prueba cada función** después de escribirla
- **No te compliques** - primero hazlo funcionar, luego mejóralo

---

¡Listo! Sigue este README paso a paso y tendrás tu CRUD funcionando en 90 minutos. 🎉
