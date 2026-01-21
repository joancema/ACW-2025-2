# ⚡ Inicio Rápido - 5 Minutos

## 🚀 Pasos para Ejecutar la Aplicación

### 1️⃣ Instalar Dependencias (1 minuto)

```bash
npm install
```

### 2️⃣ Configurar Supabase (2 minutos)

#### A. Crear Proyecto en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto
4. Espera 1-2 minutos a que se inicialice

#### B. Ejecutar Script SQL
1. En Supabase, ve a **SQL Editor**
2. Copia y pega el contenido de `SUPABASE_SETUP.sql`
3. Haz clic en **Run**

#### C. (Opcional) Agregar Datos de Prueba
1. En el mismo SQL Editor
2. Copia y pega el contenido de `DATOS_PRUEBA.sql`
3. Haz clic en **Run**

#### D. Obtener Credenciales
1. Ve a **Settings** > **API**
2. Copia:
   - **Project URL**
   - **anon public key**

### 3️⃣ Configurar Variables de Entorno (30 segundos)

Edita `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  supabaseUrl: 'PEGA_TU_PROJECT_URL_AQUI',
  supabaseKey: 'PEGA_TU_ANON_KEY_AQUI'
};
```

### 4️⃣ Ejecutar la Aplicación (30 segundos)

```bash
npm start
```

La aplicación se abrirá automáticamente en [http://localhost:4200](http://localhost:4200)

## ✅ Verificación

Si todo está bien, deberías ver:

1. ✅ La aplicación se abre en el navegador
2. ✅ No hay errores en la consola (F12)
3. ✅ Puedes crear una nueva película
4. ✅ Puedes crear categorías y actores

## 🐛 Solución Rápida de Problemas

### Error: "npm: command not found"
**Solución**: Instala Node.js desde [nodejs.org](https://nodejs.org)

### Error: "Cannot connect to Supabase"
**Solución**: 
- Verifica que copiaste bien las credenciales
- Asegúrate de que la URL termina en `/rest/v1`
- Revisa que ejecutaste el script SQL

### La página está en blanco
**Solución**:
- Abre la consola del navegador (F12)
- Busca errores en rojo
- Verifica que las credenciales sean correctas

### Error: "Port 4200 is already in use"
**Solución**:
```bash
# Detén el proceso anterior
# Ctrl+C en la terminal donde está corriendo

# O usa otro puerto
ng serve --port 4300
```

## 📚 Próximos Pasos

Una vez que la aplicación esté corriendo:

1. 📖 Lee el `README.md` completo
2. 📚 Revisa `GUIA_ESTUDIANTES.md` para entender el código
3. 🏗️ Consulta `ARQUITECTURA.md` para ver la estructura
4. 🎨 Personaliza los estilos CSS
5. ✨ Agrega nuevas funcionalidades

## 🎯 Primeras Tareas Sugeridas

### Tarea 1: Crear tu Primera Película
1. Haz clic en "Nueva Película"
2. Crea una categoría (ej: "Acción")
3. Llena el formulario de la película
4. Guarda y edita para agregar actores

### Tarea 2: Explorar el Código
1. Abre `src/app/components/movie-list/movie-list.component.ts`
2. Lee los comentarios
3. Encuentra la función `loadMovies()`
4. Entiende cómo se cargan las películas

### Tarea 3: Hacer un Cambio Simple
1. Abre `src/app/components/movie-list/movie-list.component.css`
2. Cambia el color del botón "Nueva Película"
3. Busca `.btn-create` y cambia `background-color`
4. Guarda y ve el cambio en el navegador

## 💡 Comandos Útiles

```bash
# Ejecutar en modo desarrollo
npm start

# Compilar para producción
npm run build

# Generar un nuevo componente
npx ng generate component components/mi-componente

# Ver la aplicación en otro dispositivo (misma red)
ng serve --host 0.0.0.0
```

## 📞 ¿Necesitas Ayuda?

1. 🔍 Revisa la consola del navegador (F12)
2. 📖 Lee los archivos de documentación
3. 🌐 Busca el error en Google
4. 👨‍🏫 Pregunta a tu profesor

---

**¡Listo! Ahora tienes una aplicación Angular funcionando con base de datos real. 🎉**
