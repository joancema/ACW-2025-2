// ============================================
// CONFIGURACIÓN GLOBAL DE LA APLICACIÓN
// ============================================
// Aquí se configuran los providers globales que estarán
// disponibles en toda la aplicación.

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Configuración de detección de cambios
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    // Configuración del sistema de rutas
    provideRouter(routes),
    
    // Habilita HttpClient para hacer peticiones HTTP
    // withFetch() usa la API Fetch nativa del navegador (más moderno)
    provideHttpClient(withFetch())
  ]
};
