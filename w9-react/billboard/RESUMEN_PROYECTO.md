# 📋 Resumen del Proyecto - Cartelera React

## 🎯 Objetivo del Proyecto

Este proyecto es una **versión React** de la cartelera de cine que se encuentra en `w8-cine/billboard`. El objetivo es que los estudiantes puedan **comparar ambas implementaciones** y entender las diferencias entre trabajar con y sin un framework.

---

## 📁 Estructura Completa del Proyecto

```
billboard/
├── 📚 DOCUMENTACIÓN
│   ├── README.md              # Tutorial completo paso a paso
│   ├── INICIO_RAPIDO.md       # Guía rápida para empezar
│   ├── COMPARACION.md         # Comparación lado a lado con Vanilla
│   ├── EJERCICIOS.md          # Ejercicios prácticos para estudiantes
│   └── RESUMEN_PROYECTO.md    # Este archivo
│
├── 🔧 CONFIGURACIÓN
│   ├── package.json           # Dependencias del proyecto
│   ├── tsconfig.json          # Configuración TypeScript
│   ├── tsconfig.app.json      # Config TS para la app
│   ├── tsconfig.node.json     # Config TS para Node
│   ├── vite.config.ts         # Configuración de Vite
│   ├── eslint.config.js       # Configuración ESLint
│   └── .gitignore             # Archivos ignorados por Git
│
├── 📄 HTML
│   └── index.html             # Página principal (monta React en #root)
│
└── 📂 src/
    ├── 🎨 COMPONENTES
    │   ├── App.tsx            # Componente principal (lógica de la app)
    │   └── components/
    │       └── MovieCard.tsx  # Componente de tarjeta de película
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
        └── main.tsx           # Monta React en el DOM
```

---

## 🗂️ Archivos por Categoría

### 📚 Documentación (Para Estudiantes)

| Archivo | Propósito | Cuándo usarlo |
|---------|-----------|---------------|
| **README.md** | Tutorial completo con todos los conceptos | Primera lectura, referencia completa |
| **INICIO_RAPIDO.md** | Guía rápida para ejecutar el proyecto | Quiero empezar YA |
| **COMPARACION.md** | Código lado a lado: Vanilla vs React | Entender diferencias específicas |
| **EJERCICIOS.md** | Ejercicios prácticos con soluciones | Practicar y consolidar conocimientos |
| **RESUMEN_PROYECTO.md** | Vista general del proyecto | Entender la estructura general |

### 🔧 Configuración (No modificar)

| Archivo | Qué hace |
|---------|----------|
| `package.json` | Define dependencias (React, Vite, TypeScript) |
| `tsconfig.json` | Configuración de TypeScript |
| `vite.config.ts` | Configuración de Vite (bundler) |
| `eslint.config.js` | Reglas de linting |

### 💻 Código Fuente

#### Archivos IGUALES a Vanilla TypeScript

Estos archivos son **idénticos** en ambos proyectos:

| Archivo | Qué hace | Por qué es igual |
|---------|----------|------------------|
| `src/config/supabase.ts` | Configuración de API | No depende del framework |
| `src/types/movie.ts` | Interface Movie | TypeScript puro |
| `src/api/movies.ts` | Fetch de películas | Lógica de negocio pura |

#### Archivos DIFERENTES de Vanilla TypeScript

Estos archivos tienen diferencias significativas:

| Archivo | Vanilla | React | Diferencia Principal |
|---------|---------|-------|---------------------|
| **Componente Principal** | `main.ts` | `App.tsx` | Vanilla usa `innerHTML`, React usa hooks |
| **MovieCard** | `MovieCard.ts` | `MovieCard.tsx` | Vanilla retorna string, React retorna JSX |
| **Punto de entrada** | Ejecuta función | Monta componente | React usa `createRoot()` |
| **HTML** | `<div id="app">` | `<div id="root">` | Solo convención diferente |

---

## 🔑 Conceptos Clave del Proyecto

### 1. Arquitectura en Capas

```
┌─────────────────────────────────────┐
│         UI LAYER (React)            │  ← Componentes: App.tsx, MovieCard.tsx
├─────────────────────────────────────┤
│      BUSINESS LOGIC LAYER           │  ← api/movies.ts (igual en ambos)
├─────────────────────────────────────┤
│         DATA LAYER                  │  ← Supabase (base de datos)
└─────────────────────────────────────┘
```

**Ventaja:** Solo la capa de UI cambia entre Vanilla y React.

### 2. Flujo de Datos

```
1. Usuario abre la página
   ↓
2. React monta <App />
   ↓
3. useEffect se ejecuta
   ↓
4. getMovies() hace fetch a Supabase
   ↓
5. setMovies(data) actualiza el estado
   ↓
6. React re-renderiza automáticamente
   ↓
7. Se muestran las películas
```

### 3. Hooks Utilizados

| Hook | Dónde | Para qué |
|------|-------|----------|
| `useState` | App.tsx | Guardar películas y estado de carga |
| `useEffect` | App.tsx | Ejecutar fetch al montar el componente |

### 4. Componentes

| Componente | Tipo | Props | Estado |
|------------|------|-------|--------|
| `App` | Smart | - | ✅ Tiene (movies, loading) |
| `MovieCard` | Presentational | movie | ❌ No tiene |

---

## 🎓 Objetivos de Aprendizaje

Al completar este proyecto, los estudiantes deberían entender:

### ✅ Conceptos de React

- [ ] ¿Qué es JSX?
- [ ] ¿Cómo funciona `useState`?
- [ ] ¿Cuándo se ejecuta `useEffect`?
- [ ] ¿Qué son las props?
- [ ] ¿Por qué necesito `key` en listas?
- [ ] ¿Qué es el renderizado condicional?

### ✅ Diferencias con Vanilla

- [ ] ¿Cómo es diferente manipular el DOM manualmente vs con React?
- [ ] ¿Por qué React usa `className` en vez de `class`?
- [ ] ¿Cuál es la diferencia entre `${variable}` y `{variable}`?
- [ ] ¿Por qué algunos archivos son iguales en ambos proyectos?

### ✅ Mejores Prácticas

- [ ] Separación en capas (config, types, api, components)
- [ ] Componentes reutilizables
- [ ] Props tipadas con TypeScript
- [ ] Estado inmutable

---

## 🔄 Comparación Rápida

| Aspecto | Vanilla TS | React | Ganador |
|---------|------------|-------|---------|
| **Facilidad inicial** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | Vanilla |
| **Escalabilidad** | ⭐⭐ | ⭐⭐⭐⭐⭐ | React |
| **Performance (app pequeña)** | ⭐⭐⭐⭐ | ⭐⭐⭐ | Vanilla |
| **Performance (app grande)** | ⭐⭐ | ⭐⭐⭐⭐⭐ | React |
| **Bundle size** | ⭐⭐⭐⭐⭐ (~10KB) | ⭐⭐⭐ (~150KB) | Vanilla |
| **Developer Experience** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | React |
| **Mantenibilidad** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | React |
| **Ecosistema** | ⭐⭐ | ⭐⭐⭐⭐⭐ | React |

---

## 📊 Líneas de Código

### Vanilla TypeScript
```
src/main.ts: ~50 líneas
src/components/MovieCard.ts: ~20 líneas
Total componentes: ~70 líneas
```

### React
```
src/App.tsx: ~60 líneas
src/components/MovieCard.tsx: ~25 líneas
Total componentes: ~85 líneas
```

**Conclusión:** En este proyecto simple, ambos tienen similar cantidad de código. React añade ~15 líneas por los hooks y el manejo de estado.

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

# Ejecutar linter
npm run lint
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
// Vanilla
`<h1>${title}</h1>`

// React
<h1>{title}</h1>
```

### Clases CSS
```javascript
// Vanilla
<div class="card">

// React
<div className="card">
```

### Eventos
```javascript
// Vanilla
button.addEventListener('click', handler)

// React
<button onClick={handler}>
```

### Condicionales
```javascript
// Vanilla
if (loading) {
  element.innerHTML = '<p>Cargando...</p>'
}

// React
if (loading) {
  return <p>Cargando...</p>
}
```

### Listas
```javascript
// Vanilla
movies.map(m => renderCard(m)).join('')

// React
movies.map(m => <Card key={m.id} movie={m} />)
```

---

## 🎯 Camino de Aprendizaje Sugerido

### Día 1: Entender la estructura
1. Lee `INICIO_RAPIDO.md`
2. Ejecuta el proyecto
3. Explora la estructura de archivos

### Día 2: Comparar con Vanilla
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

### ¿Por qué React es más popular si Vanilla es más simple?

React es mejor para aplicaciones grandes porque:
- Actualiza solo lo necesario (eficiente)
- Componentes reutilizables
- Gran ecosistema de librerías
- Mejor para trabajo en equipo

### ¿Siempre debería usar React?

No. Para páginas simples, Vanilla puede ser mejor:
- Menos dependencias
- Bundle más pequeño
- Más rápido de cargar

### ¿Puedo mezclar Vanilla y React?

Técnicamente sí, pero no es recomendado. Elige uno u otro.

### ¿Qué otros frameworks hay?

- Vue.js (similar a React, más fácil)
- Angular (más complejo, completo)
- Svelte (compila a Vanilla JS)

---

## 📚 Recursos Adicionales

### Documentación Oficial
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Supabase Docs](https://supabase.com/docs)

### Tutoriales Recomendados
- React Tutorial (oficial)
- TypeScript Handbook
- Vite Guide

---

## ✅ Checklist del Profesor

Al enseñar este proyecto, asegúrate de cubrir:

- [ ] Diferencias sintácticas (JSX vs Template Literals)
- [ ] Concepto de hooks (`useState`, `useEffect`)
- [ ] Props y flujo de datos
- [ ] Renderizado condicional
- [ ] Listas con `key`
- [ ] Comparación directa con Vanilla
- [ ] Cuándo usar cada enfoque
- [ ] Ventajas y desventajas de cada uno

---

## 🎓 Conclusión

Este proyecto demuestra que:

1. **La lógica de negocio es independiente del framework** (API, tipos, config son iguales)
2. **React facilita el manejo de estado** con hooks
3. **Vanilla es más directo** para proyectos simples
4. **React escala mejor** para aplicaciones complejas
5. **Ambos enfoques son válidos** según el contexto

El objetivo es que los estudiantes entiendan **cuándo usar cada herramienta**, no que una sea mejor que la otra.

---

**Última actualización:** Diciembre 2025  
**Versiones:** React 19, Vite 7, TypeScript 5.9
