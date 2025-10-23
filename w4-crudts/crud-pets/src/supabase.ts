// Configuración del cliente de Supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Faltan las credenciales de Supabase en el archivo .env')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Tipo para Mascota (solo 3 campos)
export interface Pet {
  id?: string
  name: string
  breed?: string
  age?: number
  created_at?: string
}
