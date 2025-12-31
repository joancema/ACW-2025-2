# 📋 Cheat Sheet: React vs Vue

Referencia rápida de las diferencias sintácticas entre React y Vue.

---

## 🎨 Estructura de Componentes

### React (JSX)
```tsx
import { useState } from 'react'

function MyComponent() {
  const [count, setCount] = useState(0)
  
  return (
    <div className="container">
      <h1>{count}</h1>
    </div>
  )
}

export default MyComponent
```

### Vue (SFC)
```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="container">
    <h1>{{ count }}</h1>
  </div>
</template>
```

---

## 📦 Estado

### React
```typescript
const [count, setCount] = useState(0)
const [name, setName] = useState('Juan')

// Leer
console.log(count)

// Actualizar
setCount(count + 1)
setName('María')
```

### Vue
```typescript
const count = ref(0)
const name = ref('Juan')

// Leer (en JavaScript)
console.log(count.value)

// Actualizar (en JavaScript)
count.value++
name.value = 'María'

// En template (sin .value)
<p>{{ count }}</p>
<p>{{ name }}</p>
```

---

## 🔄 Lifecycle

### React
```typescript
import { useEffect } from 'react'

// Al montar
useEffect(() => {
  console.log('Montado')
}, [])

// Al desmontar
useEffect(() => {
  return () => {
    console.log('Desmontado')
  }
}, [])

// Cuando cambia algo
useEffect(() => {
  console.log('Count cambió')
}, [count])
```

### Vue
```typescript
import { onMounted, onUnmounted, watch } from 'vue'

// Al montar
onMounted(() => {
  console.log('Montado')
})

// Al desmontar
onUnmounted(() => {
  console.log('Desmontado')
})

// Cuando cambia algo
watch(count, () => {
  console.log('Count cambió')
})
```

---

## 🎯 Props

### React
```tsx
// Padre
<MovieCard movie={movie} />

// Hijo
interface MovieCardProps {
  movie: Movie
}

function MovieCard({ movie }: MovieCardProps) {
  return <h1>{movie.title}</h1>
}
```

### Vue
```vue
<!-- Padre -->
<MovieCard :movie="movie" />

<!-- Hijo -->
<script setup lang="ts">
defineProps<{
  movie: Movie
}>()
</script>

<template>
  <h1>{{ movie.title }}</h1>
</template>
```

---

## 🔀 Condicionales

### React
```tsx
// Opción 1: Operador ternario
{loading ? (
  <p>Cargando...</p>
) : (
  <p>Contenido</p>
)}

// Opción 2: AND lógico
{loading && <p>Cargando...</p>}

// Opción 3: if + return
if (loading) {
  return <p>Cargando...</p>
}
return <p>Contenido</p>
```

### Vue
```vue
<!-- v-if / v-else -->
<p v-if="loading">Cargando...</p>
<p v-else>Contenido</p>

<!-- v-if / v-else-if / v-else -->
<p v-if="loading">Cargando...</p>
<p v-else-if="error">Error</p>
<p v-else>Contenido</p>

<!-- Solo v-if -->
<p v-if="loading">Cargando...</p>
```

---

## 🔁 Listas

### React
```tsx
{movies.map(movie => (
  <MovieCard 
    key={movie.id} 
    movie={movie} 
  />
))}
```

### Vue
```vue
<MovieCard 
  v-for="movie in movies" 
  :key="movie.id" 
  :movie="movie" 
/>
```

---

## 🎨 Clases CSS

### React
```tsx
// Estática
<div className="card">

// Dinámica
<div className={isActive ? 'active' : ''}>

// Múltiples
<div className={`card ${isActive ? 'active' : ''}`}>
```

### Vue
```vue
<!-- Estática -->
<div class="card">

<!-- Dinámica -->
<div :class="{ active: isActive }">

<!-- Múltiples -->
<div :class="['card', { active: isActive }]">
```

---

## 🔗 Atributos Dinámicos

### React
```tsx
<img src={movie.image} alt={movie.title} />
<a href={url}>Link</a>
<input type="text" value={name} />
```

### Vue
```vue
<img :src="movie.image" :alt="movie.title" />
<a :href="url">Link</a>
<input type="text" :value="name" />
```

---

## 🖱️ Eventos

### React
```tsx
<button onClick={handleClick}>Click</button>
<input onChange={(e) => setName(e.target.value)} />
<form onSubmit={handleSubmit}>
```

### Vue
```vue
<button @click="handleClick">Click</button>
<input @input="name = $event.target.value" />
<form @submit.prevent="handleSubmit">
```

---

## 📝 Formularios

### React
```tsx
const [name, setName] = useState('')

<input 
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

### Vue
```vue
<script setup lang="ts">
const name = ref('')
</script>

<template>
  <input v-model="name" />
</template>
```

---

## 🧮 Propiedades Calculadas

### React
```tsx
// Opción 1: Variable derivada
const fullName = `${firstName} ${lastName}`

// Opción 2: useMemo
const fullName = useMemo(() => {
  return `${firstName} ${lastName}`
}, [firstName, lastName])
```

### Vue
```vue
<script setup lang="ts">
import { computed } from 'vue'

const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})
</script>
```

---

## 🎭 Estilos en Línea

### React
```tsx
<div style={{ 
  color: 'red', 
  fontSize: '20px' 
}}>
```

### Vue
```vue
<div :style="{ 
  color: 'red', 
  fontSize: '20px' 
}">
```

---

## 📤 Emitir Eventos (Hijo → Padre)

### React
```tsx
// Padre
<Child onDelete={(id) => handleDelete(id)} />

// Hijo
interface ChildProps {
  onDelete: (id: string) => void
}

function Child({ onDelete }: ChildProps) {
  return <button onClick={() => onDelete('123')}>
}
```

### Vue
```vue
<!-- Padre -->
<Child @delete="handleDelete" />

<!-- Hijo -->
<script setup lang="ts">
const emit = defineEmits<{
  delete: [id: string]
}>()
</script>

<template>
  <button @click="emit('delete', '123')">
</template>
```

---

## 🔍 Refs (Acceso al DOM)

### React
```tsx
import { useRef } from 'react'

const inputRef = useRef<HTMLInputElement>(null)

useEffect(() => {
  inputRef.current?.focus()
}, [])

<input ref={inputRef} />
```

### Vue
```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const inputRef = ref<HTMLInputElement>()

onMounted(() => {
  inputRef.value?.focus()
})
</script>

<template>
  <input ref="inputRef" />
</template>
```

---

## 📊 Comparación Rápida

| Característica | React | Vue |
|----------------|-------|-----|
| **Extensión** | `.tsx` | `.vue` |
| **Template** | JSX | HTML con directivas |
| **Estado** | `useState()` | `ref()` |
| **Acceso estado** | `count` | `count.value` (JS), `count` (template) |
| **Actualizar estado** | `setCount(n)` | `count.value = n` |
| **Lifecycle** | `useEffect()` | `onMounted()`, etc. |
| **Props** | Desestructuración | `defineProps()` |
| **Eventos** | `onClick` | `@click` |
| **Clases CSS** | `className` | `class` |
| **Binding** | `src={value}` | `:src="value"` |
| **Variables** | `{value}` | `{{ value }}` |
| **Condicionales** | `condition && <div>` | `v-if` |
| **Listas** | `.map()` | `v-for` |
| **Two-way binding** | Manual | `v-model` |
| **Computed** | `useMemo()` | `computed()` |

---

## 🎯 Atajos de Vue

| Atajo | Equivale a | Ejemplo |
|-------|------------|---------|
| `:src` | `v-bind:src` | `:src="image"` |
| `@click` | `v-on:click` | `@click="handler"` |
| `#header` | `v-slot:header` | `#header` |

---

## 💡 Tips Importantes

### React
- JSX es JavaScript, puedes usar cualquier expresión
- `className` en lugar de `class`
- Eventos en camelCase: `onClick`, `onChange`
- Estado inmutable: siempre crea nuevo objeto/array

### Vue
- Template es HTML puro con directivas
- `class` normal (no `className`)
- Eventos con `@`: `@click`, `@input`
- `.value` en JavaScript, no en template
- Directivas empiezan con `v-`

---

## 🚀 Comandos Comunes

### Ambos (Vite)
```bash
# Crear proyecto
npm create vite@latest

# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview
```

---

## 📚 Imports Comunes

### React
```typescript
import { useState, useEffect, useMemo, useRef } from 'react'
```

### Vue
```typescript
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'
```

---

## ✅ Checklist de Migración React → Vue

- [ ] Cambiar extensión `.tsx` → `.vue`
- [ ] Separar en `<script>`, `<template>`, `<style>`
- [ ] `useState` → `ref` (agregar `.value` en JS)
- [ ] `useEffect` → `onMounted`, `watch`, etc.
- [ ] `className` → `class`
- [ ] `{value}` → `{{ value }}`
- [ ] `src={value}` → `:src="value"`
- [ ] `onClick` → `@click`
- [ ] `.map()` → `v-for`
- [ ] `condition && <div>` → `v-if`
- [ ] `useMemo` → `computed`

---

**Imprime esta hoja y tenla a mano mientras programas!** 📄

