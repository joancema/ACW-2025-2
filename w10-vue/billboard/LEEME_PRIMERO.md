# 👋 ¡Bienvenido al Proyecto Billboard Vue!

## 🎯 ¿Qué es este proyecto?

Este es un proyecto educativo de **cartelera de cine** creado con **Vue 3**, diseñado para estudiantes que están aprendiendo Vue por primera vez.

Es la versión Vue del proyecto que ya existe en React (`w9-react/billboard`), lo que permite comparar ambos frameworks.

---

## 🚀 Inicio Rápido (5 minutos)

### 1. Instalar dependencias
```bash
npm install
```

### 2. Ejecutar el proyecto
```bash
npm run dev
```

### 3. Abrir en el navegador
```
http://localhost:5173
```

**¡Listo!** Deberías ver la cartelera de cine funcionando.

---

## 📚 ¿Por dónde empiezo?

Dependiendo de tu objetivo, lee estos documentos en orden:

### 🎓 Si eres estudiante:

1. **INICIO_RAPIDO.md** (5 min)
   - Ejecuta el proyecto
   - Entiende la estructura básica
   - Conceptos clave de Vue

2. **README.md** (30-45 min)
   - Tutorial completo paso a paso
   - Explicación de cada archivo
   - Comparación con React

3. **COMPARACION.md** (20 min)
   - Código lado a lado: React vs Vue
   - Diferencias sintácticas
   - Cuándo usar cada uno

4. **EJERCICIOS.md** (1-2 horas)
   - Ejercicios prácticos
   - Soluciones incluidas
   - Aumenta la dificultad progresivamente

### 👨‍🏫 Si eres profesor:

1. **GUIA_PROFESOR.md** (15 min)
   - Plan de clase sugerido
   - Puntos clave para explicar
   - Errores comunes y soluciones
   - Criterios de evaluación

2. **INSTRUCCIONES_DESDE_CERO.md** (referencia)
   - Paso a paso detallado
   - Para seguir en clase
   - Incluye explicaciones para cada paso

3. **RESUMEN_PROYECTO.md** (10 min)
   - Arquitectura del proyecto
   - Objetivos de aprendizaje
   - Estructura de archivos

### 🔍 Si necesitas referencia rápida:

- **CHEATSHEET.md** - Comparación rápida React vs Vue

---

## 📁 Estructura del Proyecto

```
billboard/
├── 📚 DOCUMENTACIÓN (8 archivos .md)
│   ├── LEEME_PRIMERO.md          ← Estás aquí
│   ├── README.md                 ← Tutorial completo
│   ├── INICIO_RAPIDO.md          ← Guía rápida
│   ├── COMPARACION.md            ← React vs Vue
│   ├── EJERCICIOS.md             ← Práctica
│   ├── INSTRUCCIONES_DESDE_CERO.md ← Paso a paso
│   ├── GUIA_PROFESOR.md          ← Para profesores
│   ├── CHEATSHEET.md             ← Referencia rápida
│   └── RESUMEN_PROYECTO.md       ← Vista general
│
├── 📂 src/
│   ├── config/
│   │   └── supabase.ts           ← Configuración Supabase
│   ├── types/
│   │   └── movie.ts              ← Interface Movie
│   ├── api/
│   │   └── movies.ts             ← Funciones API
│   ├── components/
│   │   └── MovieCard.vue         ← Componente de tarjeta
│   ├── App.vue                   ← Componente principal
│   ├── App.css                   ← Estilos
│   ├── main.ts                   ← Punto de entrada
│   └── index.css                 ← Estilos globales
│
└── 🔧 Configuración
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    └── index.html
```

---

## 🎯 ¿Qué voy a aprender?

### Conceptos de Vue 3
- ✅ Single File Components (.vue)
- ✅ Composition API
- ✅ `ref()` para estado reactivo
- ✅ `onMounted()` para lifecycle
- ✅ Directivas (`v-if`, `v-for`, `v-bind`)
- ✅ Props con `defineProps`
- ✅ Interpolación `{{ }}`

### Comparación con React
- ✅ Diferencias sintácticas
- ✅ JSX vs Templates
- ✅ `useState` vs `ref()`
- ✅ `useEffect` vs `onMounted()`
- ✅ Cuándo usar cada framework

### Arquitectura
- ✅ Separación en capas
- ✅ Componentes reutilizables
- ✅ Consumo de APIs REST
- ✅ TypeScript con Vue

---

## 🔗 Relación con Otros Proyectos

Este proyecto es parte de una serie:

| Proyecto | Tecnología | Carpeta |
|----------|------------|---------|
| Cartelera Vanilla | TypeScript | `w8-cine/billboard` |
| Cartelera React | React 19 | `w9-react/billboard` |
| **Cartelera Vue** | **Vue 3** | **`w10-vue/billboard`** ← Estás aquí |

**Los tres hacen lo mismo**, pero con diferentes tecnologías. Ideal para comparar.

---

## ⚠️ Requisitos Previos

Antes de empezar, debes saber:
- ✅ HTML, CSS y JavaScript básico
- ✅ Conceptos de programación (funciones, objetos, arrays)
- ✅ (Opcional) React - para comparar

**NO necesitas:**
- ❌ Experiencia previa con Vue
- ❌ Conocimiento avanzado de TypeScript
- ❌ Experiencia con Supabase

---

## 🛠️ Tecnologías Usadas

- **Vue 3.5** - Framework progresivo
- **TypeScript 5.9** - JavaScript con tipos
- **Vite 7** - Build tool rápido
- **Supabase** - Base de datos en la nube

---

## 🎨 Características del Proyecto

- 🎬 Muestra películas desde Supabase
- 🎨 Diseño moderno y responsive
- 🔄 Estado de carga
- 📱 Grid adaptable
- 🎯 Arquitectura limpia
- 📝 Código comentado
- 🌐 Documentación completa en español

---

## 💡 Tips para Aprender

1. **No copies y pegues** - Escribe el código para entenderlo
2. **Usa console.log** - Para ver qué está pasando
3. **Lee los errores** - Vue da buenos mensajes
4. **Compara con React** - Si ya lo conoces
5. **Experimenta** - Rompe cosas y arregla
6. **Pregunta** - No te quedes con dudas

---

## 🐛 ¿Problemas?

### La página está en blanco
1. Abre la consola (F12)
2. Busca errores en rojo
3. Lee el mensaje de error
4. Consulta la sección de "Solución de Problemas" en README.md

### No se instalan las dependencias
```bash
# Intenta limpiar y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Puerto 5173 en uso
```bash
# Usa otro puerto
npm run dev -- --port 3000
```

---

## 📞 Recursos Adicionales

- [Vue 3 Docs (Español)](https://es.vuejs.org/)
- [Vue School](https://vueschool.io/) - Cursos gratuitos
- [Vue DevTools](https://devtools.vuejs.org/) - Extensión de navegador

---

## ✅ Checklist de Inicio

Marca cuando completes cada paso:

- [ ] Leí este archivo (LEEME_PRIMERO.md)
- [ ] Instalé las dependencias (`npm install`)
- [ ] Ejecuté el proyecto (`npm run dev`)
- [ ] Vi la aplicación en el navegador
- [ ] Leí INICIO_RAPIDO.md
- [ ] Exploré la estructura de archivos
- [ ] Abrí App.vue y entendí su estructura
- [ ] Leí README.md completo
- [ ] Comparé con React (si aplica)
- [ ] Hice al menos un ejercicio

---

## 🎯 Próximos Pasos

Una vez que entiendas el proyecto base:

1. **Haz los ejercicios** de EJERCICIOS.md
2. **Compara con React** usando COMPARACION.md
3. **Agrega funcionalidades** nuevas
4. **Crea tu propio proyecto** similar

---

## 🎓 Para Profesores

Si vas a enseñar este proyecto:
1. Lee **GUIA_PROFESOR.md** primero
2. Revisa **INSTRUCCIONES_DESDE_CERO.md**
3. Prueba todos los ejercicios
4. Prepara tu cuenta de Supabase

---

## 🌟 ¿Por qué Vue?

Vue es ideal para aprender porque:
- ✅ **Curva de aprendizaje suave** - Más fácil que React
- ✅ **Templates HTML** - Sintaxis familiar
- ✅ **Documentación excelente** - En español
- ✅ **Progresivo** - Puedes empezar simple y crecer
- ✅ **Single File Components** - Todo organizado

---

## 🚀 ¡Empecemos!

**Siguiente paso:** Lee **INICIO_RAPIDO.md** (5 minutos)

O si prefieres ir directo al código:
```bash
npm install
npm run dev
```

---

**¡Buena suerte con tu aprendizaje de Vue!** 🎉

---

**Última actualización:** Diciembre 2025  
**Autor:** Proyecto educativo ACW-2025-2

