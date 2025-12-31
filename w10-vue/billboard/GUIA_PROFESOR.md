# 👨‍🏫 Guía para el Profesor

Esta guía te ayudará a enseñar el proyecto de cartelera de cine con Vue 3 de manera efectiva.

---

## 📚 Documentación Disponible

El proyecto incluye varios documentos para diferentes propósitos:

| Documento | Propósito | Cuándo usar |
|-----------|-----------|-------------|
| **README.md** | Tutorial completo con conceptos y comparaciones | Lectura completa, referencia |
| **INICIO_RAPIDO.md** | Guía rápida para ejecutar el proyecto | Primera clase, setup rápido |
| **COMPARACION.md** | Comparación detallada React vs Vue | Clase de comparación |
| **EJERCICIOS.md** | Ejercicios prácticos con soluciones | Práctica en clase o tarea |
| **RESUMEN_PROYECTO.md** | Vista general de la arquitectura | Introducción al proyecto |
| **INSTRUCCIONES_DESDE_CERO.md** | Paso a paso para crear desde cero | Clase práctica completa |
| **GUIA_PROFESOR.md** | Este archivo | Preparación de clase |

---

## 🎯 Objetivos de Aprendizaje

Al finalizar, los estudiantes deberán:

### Conceptos de Vue
- [ ] Entender qué es un Single File Component (.vue)
- [ ] Usar `ref()` para crear estado reactivo
- [ ] Saber cuándo usar `.value` y cuándo no
- [ ] Usar `onMounted()` para ejecutar código al montar
- [ ] Definir props con `defineProps`
- [ ] Usar directivas: `v-if`, `v-for`, `v-bind`, `v-on`
- [ ] Entender la interpolación `{{ }}`

### Comparación con React
- [ ] Identificar diferencias sintácticas
- [ ] Comparar hooks de React con Composition API
- [ ] Entender JSX vs Templates
- [ ] Saber cuándo usar cada framework

### Arquitectura
- [ ] Separar código en capas (config, types, api, components)
- [ ] Crear componentes reutilizables
- [ ] Consumir APIs REST
- [ ] Manejar estado y efectos secundarios

---

## 📅 Plan de Clase Sugerido

### Opción 1: Clase de 3 horas (Intensiva)

**Hora 1: Introducción y Setup**
- Presentar Vue y comparar con React (15 min)
- Crear proyecto con Vite (15 min)
- Explicar estructura de carpetas (15 min)
- Configurar Supabase (15 min)

**Hora 2: Desarrollo**
- Crear interfaces y capa API (20 min)
- Crear componente MovieCard (20 min)
- Crear componente App (20 min)

**Hora 3: Finalización y Práctica**
- Agregar estilos (15 min)
- Probar la aplicación (15 min)
- Comparar con React (15 min)
- Ejercicios prácticos (15 min)

### Opción 2: Clases de 2 días (Recomendado)

**Día 1: Fundamentos (1.5 horas)**
- Introducción a Vue 3 (20 min)
- Crear proyecto y estructura (20 min)
- Configurar Supabase (20 min)
- Crear interfaces y API (30 min)

**Día 2: Componentes y Práctica (1.5 horas)**
- Crear componentes Vue (30 min)
- Agregar estilos (15 min)
- Probar y debuggear (15 min)
- Ejercicios y comparación con React (30 min)

### Opción 3: Clase Teórica + Tarea

**En clase (1 hora):**
- Presentar el proyecto completo
- Explicar conceptos clave de Vue
- Mostrar comparación con React
- Demostrar la aplicación funcionando

**Tarea:**
- Los estudiantes siguen `INSTRUCCIONES_DESDE_CERO.md`
- Crean el proyecto paso a paso
- Entregan el código funcionando

---

## 🎤 Puntos Clave para Explicar

### 1. Single File Components (.vue)

**Concepto:**
Un archivo `.vue` contiene todo lo relacionado con un componente:
- `<template>`: HTML
- `<script>`: Lógica
- `<style>`: Estilos (opcional)

**Ventaja:**
Todo está en un solo lugar, organizado y fácil de mantener.

**Ejemplo en pizarra:**
```vue
<script setup lang="ts">
// Lógica aquí
</script>

<template>
  <!-- HTML aquí -->
</template>

<style>
/* Estilos aquí (opcional) */
</style>
```

---

### 2. ref() - Estado Reactivo

**Concepto:**
`ref()` crea una variable reactiva. Cuando cambia, Vue actualiza automáticamente la UI.

**Regla importante:**
- En JavaScript: usa `.value`
- En template: NO uses `.value`

**Ejemplo en pizarra:**
```typescript
// Crear ref
const count = ref(0)

// Leer en JavaScript
console.log(count.value) // 0

// Modificar en JavaScript
count.value++

// Usar en template (sin .value)
<p>{{ count }}</p>
```

**Comparación con React:**
```typescript
// React
const [count, setCount] = useState(0)
setCount(count + 1)

// Vue
const count = ref(0)
count.value++
```

---

### 3. Directivas de Vue

**Concepto:**
Atributos especiales que empiezan con `v-` y agregan comportamiento al HTML.

**Principales directivas:**

| Directiva | Propósito | Ejemplo |
|-----------|-----------|---------|
| `v-if` | Renderizado condicional | `<p v-if="loading">Cargando...</p>` |
| `v-else` | Alternativa a v-if | `<p v-else>Contenido</p>` |
| `v-for` | Iterar arrays | `<div v-for="item in items">` |
| `v-bind` o `:` | Binding dinámico | `:src="image"` |
| `v-on` o `@` | Eventos | `@click="handleClick"` |
| `v-model` | Two-way binding | `v-model="searchTerm"` |

**Demostración:**
Muestra cómo `v-if` es más declarativo que el operador ternario de React.

---

### 4. Props con defineProps

**Concepto:**
`defineProps` es una macro de Vue para definir las props que recibe un componente.

**Ejemplo:**
```typescript
// Definir props
defineProps<{
  movie: Movie
}>()

// Usar en template
<h1>{{ movie.title }}</h1>
```

**Comparación con React:**
```typescript
// React
interface Props {
  movie: Movie
}
function MovieCard({ movie }: Props) {
  return <h1>{movie.title}</h1>
}

// Vue
defineProps<{ movie: Movie }>()
// En template: <h1>{{ movie.title }}</h1>
```

---

### 5. Lifecycle Hooks

**Concepto:**
Funciones que se ejecutan en momentos específicos del ciclo de vida del componente.

**Principales hooks:**
- `onMounted()`: Cuando el componente se monta
- `onUnmounted()`: Cuando el componente se desmonta
- `onUpdated()`: Cuando el componente se actualiza

**Comparación con React:**
```typescript
// React
useEffect(() => {
  // Código al montar
  return () => {
    // Código al desmontar
  }
}, [])

// Vue
onMounted(() => {
  // Código al montar
})

onUnmounted(() => {
  // Código al desmontar
})
```

---

## 💡 Tips para la Clase

### 1. Usa Comparaciones con React

Si los estudiantes ya conocen React, usa comparaciones constantes:
- "En React hacíamos X, en Vue hacemos Y"
- Muestra código lado a lado
- Explica por qué Vue eligió esa sintaxis

### 2. Live Coding

No solo muestres el código final:
- Escribe el código en vivo
- Comete errores a propósito y muestra cómo solucionarlos
- Usa `console.log` para mostrar el flujo de datos

### 3. Usa Vue DevTools

Instala la extensión Vue DevTools y muéstrala:
- Inspeccionar componentes
- Ver el estado reactivo
- Ver las props
- Timeline de eventos

### 4. Ejercicios Progresivos

Empieza con ejercicios simples y aumenta la dificultad:
1. Cambiar colores (CSS)
2. Agregar un contador (template)
3. Agregar rating (props + template)
4. Filtrar por género (computed + v-for)
5. Búsqueda (v-model + computed)

### 5. Debugging en Vivo

Muestra cómo debuggear errores comunes:
- Olvidar `.value`
- Olvidar `:key` en `v-for`
- Props no definidas
- Errores de TypeScript

---

## 🐛 Errores Comunes y Soluciones

### Error 1: "Cannot read property 'value' of undefined"

**Causa:** Olvidaron usar `.value`

**Solución:**
```typescript
// ❌ Incorrecto
console.log(movies)

// ✅ Correcto
console.log(movies.value)
```

**Tip:** Explica que en el template Vue lo hace automático.

---

### Error 2: "v-for should have explicit keys"

**Causa:** Olvidaron agregar `:key`

**Solución:**
```vue
<!-- ❌ Incorrecto -->
<div v-for="movie in movies">

<!-- ✅ Correcto -->
<div v-for="movie in movies" :key="movie.id">
```

**Tip:** Explica por qué las keys son importantes (performance).

---

### Error 3: "Failed to resolve component"

**Causa:** No importaron el componente

**Solución:**
```typescript
// Agregar al inicio del <script>
import MovieCard from './components/MovieCard.vue'
```

**Tip:** En Vue los componentes deben importarse explícitamente.

---

### Error 4: "Property does not exist on type"

**Causa:** TypeScript no reconoce las props

**Solución:**
```typescript
// Asegúrate de definir las props
defineProps<{
  movie: Movie
}>()
```

---

## 📊 Evaluación Sugerida

### Criterios de Evaluación

| Criterio | Puntos | Descripción |
|----------|--------|-------------|
| **Funcionalidad** | 40% | La app funciona correctamente |
| **Código limpio** | 20% | Código organizado y comentado |
| **Arquitectura** | 20% | Separación en capas correcta |
| **Estilos** | 10% | UI atractiva y responsive |
| **Extras** | 10% | Funcionalidades adicionales |

### Rúbrica Detallada

**Funcionalidad (40 puntos)**
- Muestra películas de Supabase (15 pts)
- Maneja estado de carga (10 pts)
- Maneja caso sin películas (10 pts)
- Sin errores en consola (5 pts)

**Código limpio (20 puntos)**
- Código indentado correctamente (5 pts)
- Nombres descriptivos (5 pts)
- Comentarios útiles (5 pts)
- Sin código duplicado (5 pts)

**Arquitectura (20 puntos)**
- Carpetas correctas (5 pts)
- Separación de concerns (5 pts)
- Componentes reutilizables (5 pts)
- TypeScript usado correctamente (5 pts)

**Estilos (10 puntos)**
- Diseño atractivo (5 pts)
- Responsive (5 pts)

**Extras (10 puntos)**
- Filtros por género (5 pts)
- Búsqueda (5 pts)
- Formulario para agregar (10 pts)

---

## 🎯 Ejercicios Recomendados

### Ejercicio 1: Contador (Fácil)
Agregar un contador que muestre el total de películas.

**Tiempo:** 10 minutos  
**Conceptos:** Template, interpolación

---

### Ejercicio 2: Rating (Medio)
Agregar estrellas de rating a cada película.

**Tiempo:** 20 minutos  
**Conceptos:** Props, interface, template

---

### Ejercicio 3: Filtros (Difícil)
Agregar botones para filtrar por género.

**Tiempo:** 30 minutos  
**Conceptos:** `computed`, `v-for`, eventos

---

### Ejercicio 4: Búsqueda (Difícil)
Agregar campo de búsqueda en tiempo real.

**Tiempo:** 30 minutos  
**Conceptos:** `v-model`, `computed`, filtros

---

### Ejercicio 5: Formulario (Muy Difícil)
Agregar formulario para crear películas.

**Tiempo:** 45 minutos  
**Conceptos:** `v-model`, eventos, API POST

---

## 📚 Recursos para Compartir

### Documentación Oficial
- [Vue 3 Docs (Español)](https://es.vuejs.org/)
- [Vue School](https://vueschool.io/) - Cursos gratuitos
- [Vue Mastery](https://www.vuemastery.com/)

### Videos Recomendados
- Vue 3 Crash Course
- Composition API Tutorial
- Vue vs React Comparison

### Herramientas
- [Vue DevTools](https://devtools.vuejs.org/)
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - VS Code extension
- [Vue Playground](https://play.vuejs.org/)

---

## ✅ Checklist Pre-Clase

Antes de la clase, asegúrate de:

- [ ] Tener Node.js instalado
- [ ] Tener cuenta en Supabase
- [ ] Crear tabla de películas en Supabase
- [ ] Agregar datos de prueba
- [ ] Probar que el proyecto funciona
- [ ] Instalar Vue DevTools
- [ ] Preparar ejemplos de código
- [ ] Revisar los documentos del proyecto

---

## 🎓 Consejos Finales

1. **Sé paciente:** Vue es más fácil que React, pero aún así tiene curva de aprendizaje
2. **Usa ejemplos visuales:** Muestra cómo cambia la UI cuando cambia el estado
3. **Fomenta la experimentación:** Anima a los estudiantes a romper cosas
4. **Compara constantemente:** Si vienen de React, usa comparaciones
5. **Celebra los logros:** Cuando funcione, celébralo

---

## 📞 Soporte

Si tienes dudas o encuentras errores:
- Revisa la documentación oficial de Vue
- Consulta los archivos del proyecto
- Usa los ejercicios como referencia

---

**¡Buena suerte con la clase!** 🚀

---

**Última actualización:** Diciembre 2025  
**Versión:** 1.0

