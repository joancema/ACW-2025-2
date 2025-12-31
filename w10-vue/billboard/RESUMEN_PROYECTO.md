# 📋 Resumen del Proyecto - Cartelera Vue

## 🎯 Objetivo del Proyecto

Este proyecto es una **versión Vue 3** de la cartelera de cine que se encuentra en `w9-react/billboard`. El objetivo es que los estudiantes puedan **comparar ambas implementaciones** y entender las diferencias entre React y Vue.

---

## 📁 Estructura Completa del Proyecto

```
billboard/
├── 📚 DOCUMENTACIÓN
│   ├── README.md              # Tutorial completo paso a paso
│   ├── INICIO_RAPIDO.md       # Guía rápida para empezar
│   ├── COMPARACION.md         # Comparación lado a lado con React
│   ├── EJERCICIOS.md          # Ejercicios prácticos para estudiantes
│   └── RESUMEN_PROYECTO.md    # Este archivo
│
├── 🔧 CONFIGURACIÓN
│   ├── package.json           # Dependencias del proyecto
│   ├── tsconfig.json          # Configuración TypeScript
│   ├── tsconfig.app.json      # Config TS para la app
│   ├── tsconfig.node.json     # Config TS para Node
│   └── vite.config.ts         # Configuración de Vite
│
├── 📄 HTML
│   └── index.html             # Página principal (monta Vue en #app)
│
└── 📂 src/
    ├── 🎨 COMPONENTES
    │   ├── App.vue            # Componente principal (lógica de la app)
    │   └── components/
    │       └── MovieCard.vue  # Componente de tarjeta de película
    │
    ├── 🔌 LÓGICA DE NEGOCIO
    │   ├── api/
    │   │   └── movies.ts      # Funciones para consumir API
    │   ├── config/
    │   │   └── supabase.ts    # Configuración de Supabase
    │   └── types/
    │       └── movie.ts       # Interface Movie
    │
    ├── 🎨 ESTILOS
    │   ├── App.css            # Estilos de la aplicación
    │   └── index.css          # Estilos globales
    │
    └── 🚀 PUNTO DE ENTRADA
        └── main.ts            # Monta Vue en el DOM
```

---

## 🗂️ Archivos por Categoría

### 📚 Documentación (Para Estudiantes)

| Archivo | Propósito | Cuándo usarlo |
|---------|-----------|---------------|
| **README.md** | Tutorial completo con todos los conceptos | Primera lectura, referencia completa |
| **INICIO_RAPIDO.md** | Guía rápida para ejecutar el proyecto | Quiero empezar YA |
| **COMPARACION.md** | Código lado a lado: React vs Vue | Entender diferencias específicas |
| **EJERCICIOS.md** | Ejercicios prácticos con soluciones | Practicar y consolidar conocimientos |
| **RESUMEN_PROYECTO.md** | Vista general del proyecto | Entender la estructura general |

### 🔧 Configuración (No modificar)

| Archivo | Qué hace |
|---------|----------|
| `package.json` | Define dependencias (Vue, Vite, TypeScript) |
| `tsconfig.json` | Configuración de TypeScript |
| `vite.config.ts` | Configuración de Vite (bundler) |

### 💻 Código Fuente

#### Archivos IGUALES a React

Estos archivos son **idénticos** en ambos proyectos:

| Archivo | Qué hace | Por qué es igual |
|---------|----------|------------------|
| `src/config/supabase.ts` | Configuración de API | No depende del framework |
| `src/types/movie.ts` | Interface Movie | TypeScript puro |
| `src/api/movies.ts` | Fetch de películas | Lógica de negocio pura |

#### Archivos DIFERENTES de React

Estos archivos tienen diferencias significativas:

| Archivo | React | Vue | Diferencia Principal |
|---------|-------|-----|---------------------|
| **Componente Principal** | `App.tsx` | `App.vue` | React usa JSX, Vue usa template |
| **MovieCard** | `MovieCard.tsx` | `MovieCard.vue` | React retorna JSX, Vue usa SFC |
| **Punto de entrada** | `main.tsx` | `main.ts` | Sintaxis de montaje diferente |
| **HTML** | `<div id="root">` | `<div id="app">` | Solo convención diferente |

---

## 🔑 Conceptos Clave del Proyecto

### 1. Arquitectura en Capas

```
┌─────────────────────────────────────┐
│         UI LAYER (Vue)              │  ← Componentes: App.vue, MovieCard.vue
├─────────────────────────────────────┤
│      BUSINESS LOGIC LAYER           │  ← api/movies.ts (igual que React)
├─────────────────────────────────────┤
│         DATA LAYER                  │  ← Supabase (base de datos)
└─────────────────────────────────────┘
```

**Ventaja:** Solo la capa de UI cambia entre React y Vue.

### 2. Flujo de Datos

```
1. Usuario abre la página
   ↓
2. Vue monta App.vue
   ↓
3. onMounted se ejecuta
   ↓
4. getMovies() hace fetch a Supabase
   ↓
5. movies.value = data actualiza el ref
   ↓
6. Vue re-renderiza automáticamente
   ↓
7. Se muestran las películas
```

### 3. Composition API

| Función | Dónde | Para qué |
|---------|-------|----------|
| `ref()` | App.vue | Crear estado reactivo para primitivos |
| `reactive()` | (no usado aquí) | Crear objetos reactivos |
| `computed()` | (ejercicios) | Propiedades calculadas |
| `onMounted()` | App.vue | Ejecutar código al montar |

### 4. Componentes

| Componente | Tipo | Props | Estado |
|------------|------|-------|--------|
| `App.vue` | Smart | - | ✅ Tiene (movies, loading) |
| `MovieCard.vue` | Presentational | movie | ❌ No tiene |

---

## 🎓 Objetivos de Aprendizaje

Al completar este proyecto, los estudiantes deberían entender:

### ✅ Conceptos de Vue

- [ ] ¿Qué es un Single File Component (.vue)?
- [ ] ¿Cómo funciona `ref()` y cuándo usar `.value`?
- [ ] ¿Cuándo se ejecuta `onMounted()`?
- [ ] ¿Qué son las props y cómo se definen?
- [ ] ¿Por qué necesito `:key` en `v-for`?
- [ ] ¿Qué es el renderizado condicional con directivas?
- [ ] ¿Qué son las directivas de Vue?

### ✅ Diferencias con React

- [ ] ¿Cómo es diferente JSX vs Template?
- [ ] ¿Por qué Vue usa `class` y React usa `className`?
- [ ] ¿Cuál es la diferencia entre `{variable}` y `{{ variable }}`?
- [ ] ¿Cómo se compara `useState` con `ref()`?
- [ ] ¿Cómo se compara `useEffect` con `onMounted()`?

### ✅ Mejores Prácticas

- [ ] Separación en capas (config, types, api, components)
- [ ] Componentes reutilizables
- [ ] Props tipadas con TypeScript
- [ ] Estado reactivo con Composition API

---

## 🔄 Comparación Rápida

| Aspecto | React | Vue | Ganador |
|---------|-------|-----|---------|
| **Facilidad inicial** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Vue |
| **Escalabilidad** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Empate |
| **Performance** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Empate |
| **Bundle size** | ⭐⭐⭐ (~45KB) | ⭐⭐⭐⭐ (~40KB) | Vue |
| **Developer Experience** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Vue |
| **Ecosistema** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | React |
| **Demanda laboral** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | React |
| **Documentación** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Vue |

---

## 📊 Líneas de Código

### React
```
src/App.tsx: ~60 líneas
src/components/MovieCard.tsx: ~25 líneas
Total componentes: ~85 líneas
```

### Vue
```
src/App.vue: ~55 líneas
src/components/MovieCard.vue: ~20 líneas
Total componentes: ~75 líneas
```

**Conclusión:** Vue tiende a ser más conciso gracias a las directivas y la sintaxis de template.

---

## 🚀 Comandos Útiles

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de la build
npm run preview
```

---

## 🗄️ Base de Datos (Supabase)

### Tabla: `movies`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | uuid | Primary key |
| `title` | text | Título de la película |
| `image` | text | URL de la imagen |
| `description` | text | Descripción de la película |
| `genre` | text | Género (Acción, Drama, etc.) |

### Configuración RLS (Row Level Security)

- ✅ Lectura pública habilitada (para `SELECT`)
- ❌ Escritura pública deshabilitada (por seguridad)

---

## 🎨 Paleta de Colores

```css
/* Fondo principal */
--background: #1a1a2e

/* Fondo de tarjetas */
--card-bg: #16213e

/* Color de acento (rosa) */
--accent: #e94560

/* Texto principal */
--text-primary: #eee

/* Texto secundario */
--text-secondary: #aaa
```

---

## 📝 Diferencias Sintácticas Clave

### Variables en templates
```javascript
// React
<h1>{title}</h1>

// Vue
<h1>{{ title }}</h1>
```

### Clases CSS
```javascript
// React
<div className="card">

// Vue
<div class="card">
```

### Binding Dinámico
```javascript
// React
<img src={movie.image} />

// Vue
<img :src="movie.image" />
```

### Eventos
```javascript
// React
<button onClick={handler}>

// Vue
<button @click="handler">
```

### Condicionales
```javascript
// React
{loading ? <p>Cargando...</p> : <p>Contenido</p>}

// Vue
<p v-if="loading">Cargando...</p>
<p v-else>Contenido</p>
```

### Listas
```javascript
// React
{movies.map(m => <Card key={m.id} movie={m} />)}

// Vue
<Card v-for="m in movies" :key="m.id" :movie="m" />
```

### Estado
```javascript
// React
const [count, setCount] = useState(0)
setCount(count + 1)

// Vue
const count = ref(0)
count.value++
```

---

## 🎯 Camino de Aprendizaje Sugerido

### Día 1: Entender la estructura
1. Lee `INICIO_RAPIDO.md`
2. Ejecuta el proyecto
3. Explora la estructura de archivos

### Día 2: Comparar con React
1. Lee `COMPARACION.md`
2. Abre ambos proyectos lado a lado
3. Identifica archivos iguales y diferentes

### Día 3: Tutorial completo
1. Lee `README.md` paso a paso
2. Recrea el proyecto desde cero siguiendo el tutorial
3. Compara tu código con el original

### Día 4: Práctica
1. Haz los ejercicios de `EJERCICIOS.md`
2. Experimenta con modificaciones
3. Rompe y arregla cosas

### Día 5: Proyecto propio
1. Crea tu propia aplicación similar
2. Usa lo aprendido
3. Agrega funcionalidades nuevas

---

## 🤔 Preguntas Frecuentes

### ¿Por qué Vue es más fácil que React?

Vue tiene:
- Templates HTML puros (más familiar)
- Directivas intuitivas (`v-if`, `v-for`)
- `class` normal (no `className`)
- Documentación excelente en español

### ¿Cuándo debería usar Vue en lugar de React?

Usa Vue si:
- Eres principiante en frameworks
- Prefieres templates HTML
- Valoras la curva de aprendizaje suave
- El proyecto puede crecer progresivamente

### ¿Puedo mezclar React y Vue?

No es recomendado. Elige uno u otro para tu proyecto.

### ¿Qué otros frameworks hay?

- **React**: Más popular, gran ecosistema
- **Vue**: Más fácil, excelente documentación
- **Angular**: Más complejo, completo
- **Svelte**: Compila a JavaScript vanilla

---

## 📚 Recursos Adicionales

### Documentación Oficial
- [Vue 3 Docs (Español)](https://es.vuejs.org/)
- [Vite Docs](https://vitejs.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Supabase Docs](https://supabase.com/docs)

### Tutoriales Recomendados
- Vue 3 Tutorial (oficial)
- Vue School (cursos gratuitos)
- Vue Mastery (tutoriales avanzados)

### Herramientas
- Vue DevTools (extensión de navegador)
- Volar (extensión de VS Code)

---

## ✅ Checklist del Profesor

Al enseñar este proyecto, asegúrate de cubrir:

- [ ] Diferencias sintácticas (Template vs JSX)
- [ ] Concepto de Composition API (`ref`, `onMounted`)
- [ ] Props con `defineProps`
- [ ] Renderizado condicional con directivas
- [ ] Listas con `v-for` y `:key`
- [ ] Comparación directa con React
- [ ] Cuándo usar cada framework
- [ ] Ventajas y desventajas de cada uno
- [ ] Single File Components
- [ ] Cuándo usar `.value` y cuándo no

---

## 🎓 Conclusión

Este proyecto demuestra que:

1. **La lógica de negocio es independiente del framework** (API, tipos, config son iguales)
2. **Vue facilita el aprendizaje** con templates HTML y directivas
3. **Vue es más conciso** para la mayoría de casos
4. **React tiene más demanda laboral** pero Vue es más fácil de aprender
5. **Ambos enfoques son válidos** según el contexto

El objetivo es que los estudiantes entiendan **cuándo usar cada herramienta**, no que una sea mejor que la otra.

---

## 🔄 Migración React → Vue

Si vienes de React, estos son los cambios principales:

| React | Vue |
|-------|-----|
| `useState(value)` | `ref(value)` |
| `useEffect(() => {}, [])` | `onMounted(() => {})` |
| `{variable}` | `{{ variable }}` |
| `className` | `class` |
| `src={value}` | `:src="value"` |
| `.map()` | `v-for` |
| `condition && <div>` | `v-if` |
| `onClick={fn}` | `@click="fn"` |

---

**Última actualización:** Diciembre 2025  
**Versiones:** Vue 3.5, Vite 7, TypeScript 5.9

