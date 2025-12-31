# 🚀 Inicio Rápido - Cartelera Vue

## Para empezar ahora mismo:

### 1️⃣ Instalar dependencias

```bash
cd w10-vue/billboard
npm install
```

### 2️⃣ Ejecutar el proyecto

```bash
npm run dev
```

### 3️⃣ Abrir en el navegador

Abre `http://localhost:5173`

---

## 📁 Estructura del Proyecto

```
billboard/
├── src/
│   ├── config/
│   │   └── supabase.ts      # Configuración de la base de datos
│   ├── types/
│   │   └── movie.ts         # Interface Movie
│   ├── api/
│   │   └── movies.ts        # Función para obtener películas
│   ├── components/
│   │   └── MovieCard.vue    # Componente de tarjeta (Vue)
│   ├── App.vue              # Componente principal (Vue)
│   ├── App.css              # Estilos
│   ├── main.ts              # Punto de entrada
│   └── index.css            # Estilos globales
├── index.html               # HTML base
└── package.json             # Dependencias
```

---

## 🔧 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run preview` | Vista previa de la build |

---

## 🎯 Archivos Importantes para Estudiantes

### 1. `src/App.vue` - Componente Principal
Aquí está la lógica principal de Vue:
- `ref()` para el estado reactivo
- `onMounted()` para cargar datos
- Directivas `v-if`, `v-else` para renderizado condicional
- Directiva `v-for` para listas

### 2. `src/components/MovieCard.vue` - Componente Hijo
Ejemplo de componente reutilizable:
- Recibe props con `defineProps`
- Template HTML puro
- Sin estado (stateless)

### 3. `src/api/movies.ts` - Capa API
Igual que en React y Vanilla TypeScript:
- Usa `fetch`
- Retorna `Promise<Movie[]>`
- Manejo de errores

---

## 📚 Conceptos Vue en Este Proyecto

### 1. **ref()** - Estado Reactivo
```typescript
const movies = ref<Movie[]>([])
```
- `movies.value`: valor actual en JavaScript
- `movies`: acceso directo en template
- Cuando se actualiza, Vue re-renderiza

### 2. **onMounted()** - Lifecycle Hook
```typescript
onMounted(() => {
  // Código que se ejecuta al montar
})
```

### 3. **defineProps** - Definir Props
```typescript
defineProps<{
  movie: Movie
}>()
```
- Define props con tipos TypeScript
- Solo lectura
- Acceso directo en template

### 4. **Template** - HTML con Directivas
```vue
<template>
  <div class="card">{{ title }}</div>
</template>
```
- `{{ variable }}` para insertar código
- `class` normal (no `className`)
- Directivas especiales (`v-if`, `v-for`, etc.)

### 5. **v-for** - Iterar Listas
```vue
<MovieCard 
  v-for="movie in movies" 
  :key="movie.id" 
  :movie="movie" 
/>
```
- Vue necesita `:key` para listas
- Debe ser único
- Mejora el rendimiento

### 6. **v-bind o :** - Binding Dinámico
```vue
<!-- Forma larga -->
<img v-bind:src="movie.image" />

<!-- Forma corta (recomendada) -->
<img :src="movie.image" />
```

---

## 🆚 Comparación Rápida con React

| Lo que haces en React | Lo que haces en Vue |
|------------------------|---------------------|
| `return <div>...</div>` | `<template><div>...</div></template>` |
| `{variable}` | `{{ variable }}` |
| `className="..."` | `class="..."` |
| `useState()` | `ref()` o `reactive()` |
| `useEffect()` | `onMounted()`, `onUnmounted()`, etc. |
| `.map()` con `key` | `v-for` con `:key` |
| `src={value}` | `:src="value"` |

---

## ❓ Preguntas Frecuentes

### ¿Por qué los archivos son `.vue` y no `.ts`?
Porque son Single File Components (SFC). Cada archivo `.vue` contiene template, script y style en un solo lugar.

### ¿Qué es `ref()` y por qué necesito `.value`?
`ref()` crea una referencia reactiva. En JavaScript necesitas `.value` para acceder al valor, pero en el template Vue lo hace automáticamente.

### ¿Cuándo uso `ref()` vs `reactive()`?
- `ref()`: Para valores primitivos (string, number, boolean) y arrays
- `reactive()`: Para objetos complejos

### ¿Por qué necesito `:key` en v-for?
Vue usa las keys para identificar qué elementos cambiaron, se agregaron o se eliminaron. Mejora el rendimiento.

### ¿Puedo usar la misma API que React?
¡Sí! La capa API (`api/movies.ts`) es idéntica en todos los proyectos (Vanilla, React, Vue).

---

## 🎓 Para Aprender Más

1. **Lee `README.md`** - Tutorial completo paso a paso
2. **Lee `COMPARACION.md`** - Comparación lado a lado con React
3. **Experimenta** - Cambia cosas y observa qué pasa
4. **Compara** - Mira los proyectos w8-cine (Vanilla) y w9-react (React)

---

## 🐛 Solución de Problemas

### La página está en blanco
- Abre la consola (F12) y busca errores
- Verifica que Supabase esté configurado
- Revisa que la tabla `movies` tenga datos

### "Cannot find module 'vue'"
```bash
npm install
```

### Puerto 5173 en uso
Cierra otros servidores de Vite o usa:
```bash
npm run dev -- --port 3000
```

### Error: "Cannot read property 'value' of undefined"
Verifica que estés usando `.value` al acceder a refs en JavaScript:
```typescript
// ❌ Incorrecto
console.log(movies)

// ✅ Correcto
console.log(movies.value)
```

---

## ✅ Checklist de Aprendizaje

Marca cuando entiendas cada concepto:

- [ ] ¿Qué es un Single File Component (.vue)?
- [ ] ¿Cómo funciona `ref()`?
- [ ] ¿Cuándo se ejecuta `onMounted()`?
- [ ] ¿Qué son las props y cómo se definen?
- [ ] ¿Por qué usamos `:key` en `v-for`?
- [ ] ¿Qué es el renderizado condicional con `v-if`?
- [ ] ¿Cómo crear un componente reutilizable?
- [ ] ¿Cuál es la diferencia con React?
- [ ] ¿Cuándo uso `.value` y cuándo no?
- [ ] ¿Qué son las directivas de Vue?

---

## 🎯 Desafíos

Una vez que entiendas el código base, intenta:

1. **Fácil**: Cambiar los colores del tema
2. **Medio**: Agregar un contador de películas
3. **Medio**: Filtrar por género
4. **Difícil**: Agregar un formulario para crear películas
5. **Difícil**: Implementar búsqueda en tiempo real

---

## 🔄 Diferencias Clave Vue vs React

### Sintaxis de Template
```vue
<!-- Vue: HTML puro -->
<div class="card">
  <h1>{{ title }}</h1>
  <img :src="image" />
</div>
```

```jsx
// React: JSX
<div className="card">
  <h1>{title}</h1>
  <img src={image} />
</div>
```

### Estado
```typescript
// Vue
const count = ref(0)
count.value++

// React
const [count, setCount] = useState(0)
setCount(count + 1)
```

### Condicionales
```vue
<!-- Vue -->
<p v-if="loading">Cargando...</p>
<p v-else>Contenido</p>
```

```jsx
// React
{loading ? (
  <p>Cargando...</p>
) : (
  <p>Contenido</p>
)}
```

### Listas
```vue
<!-- Vue -->
<div v-for="item in items" :key="item.id">
  {{ item.name }}
</div>
```

```jsx
// React
{items.map(item => (
  <div key={item.id}>
    {item.name}
  </div>
))}
```

---

## 💡 Ventajas de Vue

1. **Sintaxis más simple**: Templates HTML puros
2. **Curva de aprendizaje suave**: Más fácil para principiantes
3. **Single File Components**: Todo organizado en un archivo
4. **Directivas intuitivas**: `v-if`, `v-for` son claras
5. **No necesitas `className`**: Usas `class` normal
6. **Documentación excelente**: En español y muy completa

---

## 📊 Comparación de Tamaño

| Framework | Bundle Size (min+gzip) |
|-----------|----------------------|
| Vanilla TS | ~10 KB |
| Vue 3 | ~40 KB |
| React 18 | ~45 KB |

**Nota:** Vue es ligeramente más pequeño que React.

---

¡Feliz aprendizaje con Vue! 🚀

