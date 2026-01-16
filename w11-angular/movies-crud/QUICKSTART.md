# 🚀 Inicio Rápido - Movies CRUD

## Instalación y Ejecución

### 1. Instalar Dependencias

```bash
cd movies-crud
npm install
```

### 2. Configurar Variables de Entorno

Edita `src/environments/environment.ts` con tus credenciales de Supabase:

```typescript
export const environment = {
  production: false,
  supabaseUrl: 'https://TU-PROYECTO.supabase.co/rest/v1',
  supabaseKey: 'TU-ANON-KEY-AQUI'
};
```

### 3. Ejecutar la Aplicación

```bash
ng serve
```

Abre tu navegador en `http://localhost:4200`

---

## Estructura de Rutas

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | HomeComponent | Página principal con menú |
| `/billboard` | BillboardComponent | Cartelera pública de películas |
| `/admin` | MovieListComponent | Lista administrativa (CRUD) |
| `/admin/new` | MovieFormComponent | Crear nueva película |
| `/admin/edit/:id` | MovieFormComponent | Editar película existente |

---

## Funcionalidades

### 🎬 Cartelera Pública
- Ver todas las películas en formato de tarjetas
- Diseño responsive
- Volver al inicio

### ⚙️ Administración
- **Listar** todas las películas en tabla
- **Crear** nueva película con formulario validado
- **Editar** película existente
- **Eliminar** película con confirmación

---

## Tecnologías

- **Angular 19** - Framework
- **TypeScript** - Lenguaje
- **RxJS** - Programación reactiva
- **Angular Router** - Navegación
- **Reactive Forms** - Formularios
- **HttpClient** - Peticiones HTTP
- **Supabase** - Base de datos

---

## Comandos Útiles

```bash
# Desarrollo
ng serve

# Compilar para producción
ng build --configuration=production

# Generar componente
ng generate component nombre

# Generar servicio
ng generate service nombre
```

---

## Configuración de Supabase

### 1. Crear Tabla

```sql
CREATE TABLE movies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  genre TEXT NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2. Habilitar RLS

Ve a Authentication > Policies y crea una política para permitir acceso público:

```sql
-- Permitir SELECT
CREATE POLICY "Allow public read access" ON movies
FOR SELECT USING (true);

-- Permitir INSERT
CREATE POLICY "Allow public insert access" ON movies
FOR INSERT WITH CHECK (true);

-- Permitir UPDATE
CREATE POLICY "Allow public update access" ON movies
FOR UPDATE USING (true);

-- Permitir DELETE
CREATE POLICY "Allow public delete access" ON movies
FOR DELETE USING (true);
```

### 3. Obtener Credenciales

1. Ve a Settings > API
2. Copia:
   - Project URL (sin `/rest/v1`)
   - anon/public key

---

## Solución de Problemas

### Error: "Cannot find module '@angular/core'"
```bash
npm install
```

### Error: "Cannot GET /admin"
Asegúrate de que `ng serve` esté corriendo y recarga la página.

### Error: "Failed to fetch"
Verifica que las credenciales de Supabase sean correctas en `environment.ts`.

### Las películas no se muestran
1. Verifica que la tabla `movies` exista en Supabase
2. Verifica que las RLS policies permitan acceso público
3. Revisa la consola del navegador para errores

---

## Próximos Pasos

Lee el `README.md` completo para entender:
- Arquitectura del proyecto
- Cómo crear cada componente desde cero
- Conceptos clave de Angular
- Mejores prácticas

¡Disfruta construyendo con Angular! 🎉
