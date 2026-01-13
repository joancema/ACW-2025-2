// ============================================
// VARIABLES DE ENTORNO - PRODUCCIÓN
// ============================================
// Este archivo se usa cuando compilas con `ng build --configuration=production`.
// Angular automáticamente reemplaza environment.ts con este archivo.

export const environment = {
  // Indica que estamos en modo producción
  production: true,
  
  // URL base de la API REST de Supabase (producción)
  supabaseUrl: 'https://mefqiknqtmsrvygeghnw.supabase.co/rest/v1',
  
  // Clave pública (anon key) para autenticación (producción)
  supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lZnFpa25xdG1zcnZ5Z2VnaG53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNDQyNzYsImV4cCI6MjA3NjcyMDI3Nn0.aqg9_3Yl6dBULyNRwxS_BEJj1hjv7TNBFkxHVsrDAVA'
};
