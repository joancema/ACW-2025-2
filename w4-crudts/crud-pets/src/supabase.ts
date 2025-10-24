// PASO 1️⃣: IMPORTAR DEPENDENCIA PRINCIPAL DE SUPABASE
// Se importa la función createClient desde el SDK oficial de Supabase.
// Este cliente será el que permita hacer todas las operaciones (select, insert, update, delete).
import { createClient } from '@supabase/supabase-js'

// PASO 2️⃣: LEER VARIABLES DE ENTORNO (.env)
// Se usa import.meta.env porque este proyecto está hecho con Vite.
// Aquí se guardan las credenciales que provee Supabase en su panel.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// PASO 3️⃣: VALIDAR EXISTENCIA DE CREDENCIALES
// Antes de crear el cliente, se verifica que las variables existan.
// Si no están definidas en el archivo .env, se lanza un error para detener la ejecución.
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Faltan las credenciales de Supabase en el archivo .env')
}

// PASO 4️⃣: CREAR EL CLIENTE SUPABASE
// Se construye el objeto "supabase" que contiene todos los métodos para comunicarse con la base de datos.
// A partir de aquí, se podrá hacer supabase.from('tabla').select(), .insert(), .update(), .delete(), etc.
export const supabase = createClient(supabaseUrl, supabaseKey)

// PASO 5️⃣: DEFINIR LA INTERFAZ DE DATOS
// Se define una interfaz llamada "Pet" que describe la estructura de una mascota (tabla pets).
// Esto permite tener autocompletado y validación de tipos en TypeScript.
export interface Pet {
  // PASO 6️⃣: ID OPCIONAL
  // Se marca como opcional (?) porque Supabase genera el id automáticamente al insertar un nuevo registro.
  id?: string

  // PASO 7️⃣: NOMBRE OBLIGATORIO
  // Este campo es requerido ya que toda mascota debe tener un nombre.
  name: string

  // PASO 8️⃣: RAZA OPCIONAL
  // Si el usuario no define la raza, este campo puede quedar vacío (undefined).
  breed?: string

  // PASO 9️⃣: EDAD OPCIONAL
  // Puede omitirse si no se conoce. Se define como number para facilitar conversiones y cálculos.
  age?: number

  // PASO 🔟: FECHA DE CREACIÓN OPCIONAL
  // Supabase la completa automáticamente con un timestamp en el backend.
  created_at?: string
}