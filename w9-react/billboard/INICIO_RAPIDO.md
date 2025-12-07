# 🚀 Inicio Rápido - Cartelera React

## Para empezar ahora mismo:

### 1️⃣ Instalar dependencias

```bash
cd w9-react/billboard
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
│   │   └── MovieCard.tsx    # Componente de tarjeta (React)
│   ├── App.tsx              # Componente principal (React)
│   ├── App.css              # Estilos
│   ├── main.tsx             # Punto de entrada
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
| `npm run lint` | Ejecuta ESLint |

---

## 🎯 Archivos Importantes para Estudiantes

### 1. `src/App.tsx` - Componente Principal
Aquí está la lógica principal de React:
- `useState` para el estado
- `useEffect` para cargar datos
- Renderizado condicional
- Lista de componentes

### 2. `src/components/MovieCard.tsx` - Componente Hijo
Ejemplo de componente reutilizable:
- Recibe props
- Retorna JSX
- Sin estado (stateless)

### 3. `src/api/movies.ts` - Capa API
Igual que en Vanilla TypeScript:
- Usa `fetch`
- Retorna `Promise<Movie[]>`
- Manejo de errores

---

## 📚 Conceptos React en Este Proyecto

### 1. **useState** - Estado Reactivo
```typescript
const [movies, setMovies] = useState<Movie[]>([])
```
- `movies`: valor actual
- `setMovies`: función para actualizar
- Cuando se actualiza, React re-renderiza

### 2. **useEffect** - Efectos
```typescript
useEffect(() => {
  // Código que se ejecuta al montar
}, []) // [] = solo una vez
```

### 3. **Props** - Pasar Datos
```typescript
<MovieCard movie={movie} />
```
- Pasa datos de padre a hijo
- Solo lectura

### 4. **JSX** - Sintaxis HTML en JS
```typescript
return <div className="card">{title}</div>
```
- `className` en lugar de `class`
- `{variable}` para insertar código
- Debe retornar un elemento raíz

### 5. **key** - Identificadores Únicos
```typescript
{movies.map(movie => (
  <MovieCard key={movie.id} movie={movie} />
))}
```
- React necesita `key` para listas
- Debe ser único
- Mejora el rendimiento

---

## 🆚 Comparación Rápida con Vanilla

| Lo que haces en Vanilla | Lo que haces en React |
|-------------------------|----------------------|
| `innerHTML = '...'` | `return <div>...</div>` |
| `${variable}` | `{variable}` |
| `class="..."` | `className="..."` |
| Variables normales | `useState()` |
| Código directo | `useEffect()` |
| `.map().join('')` | `.map()` con `key` |

---

## ❓ Preguntas Frecuentes

### ¿Por qué los archivos son `.tsx` y no `.ts`?
Porque contienen JSX (sintaxis que parece HTML). TypeScript necesita saber esto para compilarlos correctamente.

### ¿Qué es `StrictMode`?
Un modo de React que ayuda a detectar problemas durante el desarrollo. No afecta producción.

### ¿Por qué necesito `key` en las listas?
React usa las keys para identificar qué elementos cambiaron, se agregaron o se eliminaron. Mejora el rendimiento.

### ¿Puedo usar la misma API que Vanilla?
¡Sí! La capa API (`api/movies.ts`) es idéntica en ambos proyectos.

---

## 🎓 Para Aprender Más

1. **Lee `README.md`** - Tutorial completo paso a paso
2. **Lee `COMPARACION.md`** - Comparación lado a lado con Vanilla
3. **Experimenta** - Cambia cosas y observa qué pasa
4. **Compara** - Mira el proyecto w8-cine/billboard (Vanilla)

---

## 🐛 Solución de Problemas

### La página está en blanco
- Abre la consola (F12) y busca errores
- Verifica que Supabase esté configurado
- Revisa que la tabla `movies` tenga datos

### "Cannot find module 'react'"
```bash
npm install
```

### Puerto 5173 en uso
Cierra otros servidores de Vite o usa:
```bash
npm run dev -- --port 3000
```

---

## ✅ Checklist de Aprendizaje

Marca cuando entiendas cada concepto:

- [ ] ¿Qué es JSX y cómo se diferencia de HTML?
- [ ] ¿Cómo funciona `useState`?
- [ ] ¿Cuándo se ejecuta `useEffect`?
- [ ] ¿Qué son las props?
- [ ] ¿Por qué usamos `key` en listas?
- [ ] ¿Qué es el renderizado condicional?
- [ ] ¿Cómo crear un componente reutilizable?
- [ ] ¿Cuál es la diferencia con Vanilla TypeScript?

---

## 🎯 Desafíos

Una vez que entiendas el código base, intenta:

1. **Fácil**: Cambiar los colores del tema
2. **Medio**: Agregar un contador de películas
3. **Medio**: Filtrar por género
4. **Difícil**: Agregar un formulario para crear películas
5. **Difícil**: Implementar búsqueda en tiempo real

---

¡Feliz aprendizaje! 🚀
