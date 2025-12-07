// ============================================
// MAIN - PUNTO DE ENTRADA (REACT)
// ============================================
// Este archivo monta la aplicación React en el DOM.
//
// DIFERENCIA CON VANILLA TS:
// - En Vanilla: ejecutábamos funciones directamente
// - En React: "montamos" el componente App en el DOM

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// ============================================
// MONTAR LA APLICACIÓN
// ============================================
// 1. Buscamos el elemento #root en el HTML
// 2. Creamos un "root" de React
// 3. Renderizamos el componente App dentro de StrictMode

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// StrictMode: modo estricto de React que ayuda a detectar problemas
// Solo funciona en desarrollo, no afecta la versión de producción
