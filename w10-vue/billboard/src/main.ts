// ============================================
// MAIN - PUNTO DE ENTRADA (VUE)
// ============================================
// Este archivo es el punto de entrada de la aplicación.
// Aquí se crea la instancia de Vue y se monta en el DOM.

import { createApp } from 'vue'
import './index.css'
import App from './App.vue'

// Creamos la aplicación Vue y la montamos en el elemento con id="app"
createApp(App).mount('#app')
