# 📚 Guía para Estudiantes - Sistema de Películas

## 🎯 ¿Qué voy a aprender?

En este proyecto aprenderás a crear una aplicación web completa usando Angular y una base de datos real. Es como crear tu propio Netflix o IMDb, pero más simple.

## 🧩 Conceptos Clave

### 1. ¿Qué es un CRUD?

**CRUD** significa:
- **C**reate (Crear) - Agregar nuevas películas
- **R**ead (Leer) - Ver la lista de películas
- **U**pdate (Actualizar) - Editar una película
- **D**elete (Eliminar) - Borrar una película

### 2. ¿Cómo funcionan las relaciones?

Imagina que tienes tres cajas:

```
📦 Caja de CATEGORÍAS        📦 Caja de PELÍCULAS        📦 Caja de ACTORES
   - Acción                     - Inception                  - Leonardo DiCaprio
   - Drama                      - Titanic                    - Kate Winslet
   - Comedia                    - Forrest Gump               - Tom Hanks
```

**Relación 1: Categoría → Película (Uno a Muchos)**
- Una categoría puede tener muchas películas
- Ejemplo: "Acción" tiene: Inception, Matrix, Avengers

**Relación 2: Película ↔ Actor (Muchos a Muchos)**
- Una película puede tener muchos actores
- Un actor puede estar en muchas películas
- Ejemplo: Leonardo DiCaprio está en Inception y Titanic

### 3. ¿Qué es un Componente?

Un componente es como un bloque de LEGO. Cada uno tiene:

```
📄 archivo.component.ts   → El cerebro (lógica)
📄 archivo.component.html → La cara (lo que ves)
📄 archivo.component.css  → La ropa (estilos)
```

### 4. ¿Qué es un Servicio?

Un servicio es como un mensajero que va a buscar datos a la base de datos:

```
Tu Componente → Servicio → Internet → Supabase (Base de Datos)
                    ↓
              Trae los datos
                    ↓
Tu Componente ← Servicio ← Internet ← Supabase
```

## 🗺️ Mapa de la Aplicación

### Flujo de Usuario

```
1. Entras a la app
   ↓
2. Ves la lista de películas
   ↓
3. Haces clic en "Nueva Película"
   ↓
4. ¿No hay categorías? → Creas una → Regresas
   ↓
5. Llenas el formulario de película
   ↓
6. Guardas la película
   ↓
7. Editas la película para agregar actores
   ↓
8. Haces clic en "Agregar Actor"
   ↓
9. Seleccionas un actor o creas uno nuevo
   ↓
10. ¡Listo! Tu película tiene actores
```

## 📖 Explicación del Código

### Ejemplo 1: Crear una Película

```typescript
// En movie.service.ts
createMovie(movie: Omit<Movie, 'id' | 'created_at'>): Observable<Movie | null> {
  // Envía los datos a Supabase
  return this.http.post<Movie[]>(`${this.apiUrl}/movies`, movie, {
    headers: this.getHeaders()
  }).pipe(
    // Si todo sale bien, devuelve la película creada
    map(movies => movies && movies.length > 0 ? movies[0] : null),
    // Si hay un error, lo maneja
    catchError(error => {
      console.error('Error al crear película:', error);
      return of(null);
    })
  );
}
```

**¿Qué hace este código?**
1. Recibe los datos de la película
2. Los envía a Supabase usando HTTP POST
3. Espera la respuesta
4. Si todo va bien, devuelve la película creada
5. Si hay error, devuelve null

### Ejemplo 2: Mostrar Películas en el HTML

```html
<!-- En movie-list.component.html -->
@for (movie of movies; track movie.id) {
  <div class="movie-card">
    <h2>{{ movie.title }}</h2>
    <img [src]="movie.image" />
    <p>{{ movie.description }}</p>
  </div>
}
```

**¿Qué hace este código?**
1. `@for` - Repite el código para cada película
2. `{{ movie.title }}` - Muestra el título de la película
3. `[src]="movie.image"` - Pone la imagen de la película
4. Se repite automáticamente para todas las películas

### Ejemplo 3: Formulario Reactivo

```typescript
// En movie-form.component.ts
this.movieForm = this.fb.group({
  title: ['', [Validators.required, Validators.minLength(2)]],
  category_id: ['', [Validators.required]],
  image: ['', [Validators.required]],
  description: ['', [Validators.required, Validators.minLength(10)]]
});
```

**¿Qué hace este código?**
- Crea un formulario con 4 campos
- Cada campo tiene validaciones:
  - `required` - El campo es obligatorio
  - `minLength(2)` - Mínimo 2 caracteres
- Si las validaciones fallan, muestra errores

## 🔍 Explorando el Proyecto

### Archivos Importantes

1. **src/app/app.routes.ts**
   - Define las URLs de tu aplicación
   - Ejemplo: `/movies` muestra la lista de películas

2. **src/app/services/movie.service.ts**
   - Se comunica con Supabase
   - Tiene funciones para crear, leer, actualizar y eliminar

3. **src/app/components/movie-form/**
   - El formulario para crear/editar películas
   - Aquí es donde agregas categorías y actores

4. **src/environments/environment.ts**
   - Guarda las credenciales de Supabase
   - ⚠️ NUNCA compartas estas credenciales públicamente

## 🎨 Personalización

### Cambiar Colores

En los archivos `.css`, busca colores como:
```css
background-color: #2196F3;  /* Azul */
```

Cámbialos por:
```css
background-color: #FF5722;  /* Naranja */
background-color: #9C27B0;  /* Morado */
background-color: #4CAF50;  /* Verde */
```

### Agregar Más Campos

Si quieres agregar un campo "año" a las películas:

1. **Actualiza la base de datos** (SUPABASE_SETUP.sql):
```sql
ALTER TABLE movies ADD COLUMN year INTEGER;
```

2. **Actualiza el modelo** (movie.model.ts):
```typescript
export interface Movie {
  id: string;
  title: string;
  year: number;  // ← Nuevo campo
  // ... otros campos
}
```

3. **Actualiza el formulario** (movie-form.component.ts):
```typescript
this.movieForm = this.fb.group({
  title: ['', [Validators.required]],
  year: ['', [Validators.required]],  // ← Nuevo campo
  // ... otros campos
});
```

4. **Actualiza el HTML** (movie-form.component.html):
```html
<input type="number" formControlName="year" placeholder="2024" />
```

## 💡 Consejos

### Para Depurar (Debug)

1. **Abre la consola del navegador**: Presiona F12
2. **Busca errores**: Aparecen en rojo
3. **Usa console.log()**: Imprime valores para ver qué pasa

```typescript
console.log('Películas cargadas:', this.movies);
console.log('Formulario válido?', this.movieForm.valid);
```

### Errores Comunes

**Error: "Cannot read property of undefined"**
- Significa que estás intentando usar algo que no existe
- Solución: Verifica que los datos se hayan cargado

**Error: "Http failure response"**
- Problema de conexión con Supabase
- Solución: Verifica las credenciales en `environment.ts`

**Error: "Required validator"**
- Un campo obligatorio está vacío
- Solución: Llena todos los campos marcados con *

## 🚀 Próximos Pasos

Una vez que entiendas este proyecto, puedes:

1. ✅ Agregar más campos (director, año, calificación)
2. ✅ Agregar búsqueda de películas
3. ✅ Agregar filtros por categoría
4. ✅ Agregar paginación (mostrar 10 películas por página)
5. ✅ Agregar autenticación de usuarios
6. ✅ Permitir que usuarios califiquen películas

## 📞 ¿Necesitas Ayuda?

1. Lee los comentarios en el código
2. Revisa el README.md principal
3. Busca en la documentación de Angular
4. Pregunta a tu profesor

---

**¡Éxito en tu aprendizaje! 🎓**
