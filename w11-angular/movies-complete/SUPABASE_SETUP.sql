-- ============================================
-- SCRIPT DE CONFIGURACIÓN DE BASE DE DATOS
-- ============================================
-- Este script crea todas las tablas necesarias en Supabase
-- para la aplicación de gestión de películas

-- IMPORTANTE: Ejecuta este script en el SQL Editor de Supabase
-- (https://supabase.com/dashboard/project/YOUR_PROJECT/sql)

-- ============================================
-- 1. TABLA DE CATEGORÍAS
-- ============================================
-- Almacena las categorías de películas (Acción, Drama, etc.)

CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- 2. TABLA DE PELÍCULAS
-- ============================================
-- Almacena la información principal de cada película

CREATE TABLE IF NOT EXISTS movies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- 3. TABLA DE ACTORES
-- ============================================
-- Almacena la información de los actores

CREATE TABLE IF NOT EXISTS actors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- 4. TABLA INTERMEDIA PELÍCULA-ACTOR
-- ============================================
-- Tabla de relación muchos a muchos entre películas y actores
-- Una película puede tener muchos actores
-- Un actor puede aparecer en muchas películas

CREATE TABLE IF NOT EXISTS movie_actors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  movie_id UUID REFERENCES movies(id) ON DELETE CASCADE NOT NULL,
  actor_id UUID REFERENCES actors(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(movie_id, actor_id) -- Evita duplicados
);

-- ============================================
-- 5. ÍNDICES PARA MEJORAR EL RENDIMIENTO
-- ============================================

CREATE INDEX IF NOT EXISTS idx_movies_category_id ON movies(category_id);
CREATE INDEX IF NOT EXISTS idx_movie_actors_movie_id ON movie_actors(movie_id);
CREATE INDEX IF NOT EXISTS idx_movie_actors_actor_id ON movie_actors(actor_id);

-- ============================================
-- 6. POLÍTICAS DE SEGURIDAD (RLS)
-- ============================================
-- Habilita Row Level Security y permite acceso público
-- NOTA: En producción, deberías configurar políticas más restrictivas

-- Habilitar RLS en todas las tablas
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE actors ENABLE ROW LEVEL SECURITY;
ALTER TABLE movie_actors ENABLE ROW LEVEL SECURITY;

-- Políticas para CATEGORIES
CREATE POLICY "Permitir lectura pública de categorías" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Permitir inserción pública de categorías" ON categories
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir actualización pública de categorías" ON categories
  FOR UPDATE USING (true);

CREATE POLICY "Permitir eliminación pública de categorías" ON categories
  FOR DELETE USING (true);

-- Políticas para MOVIES
CREATE POLICY "Permitir lectura pública de películas" ON movies
  FOR SELECT USING (true);

CREATE POLICY "Permitir inserción pública de películas" ON movies
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir actualización pública de películas" ON movies
  FOR UPDATE USING (true);

CREATE POLICY "Permitir eliminación pública de películas" ON movies
  FOR DELETE USING (true);

-- Políticas para ACTORS
CREATE POLICY "Permitir lectura pública de actores" ON actors
  FOR SELECT USING (true);

CREATE POLICY "Permitir inserción pública de actores" ON actors
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir actualización pública de actores" ON actors
  FOR UPDATE USING (true);

CREATE POLICY "Permitir eliminación pública de actores" ON actors
  FOR DELETE USING (true);

-- Políticas para MOVIE_ACTORS
CREATE POLICY "Permitir lectura pública de movie_actors" ON movie_actors
  FOR SELECT USING (true);

CREATE POLICY "Permitir inserción pública de movie_actors" ON movie_actors
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir actualización pública de movie_actors" ON movie_actors
  FOR UPDATE USING (true);

CREATE POLICY "Permitir eliminación pública de movie_actors" ON movie_actors
  FOR DELETE USING (true);

-- ============================================
-- 7. DATOS DE EJEMPLO (OPCIONAL)
-- ============================================
-- Puedes descomentar estas líneas para insertar datos de prueba

/*
-- Insertar categorías de ejemplo
INSERT INTO categories (name) VALUES 
  ('Acción'),
  ('Drama'),
  ('Comedia'),
  ('Ciencia Ficción'),
  ('Terror')
ON CONFLICT (name) DO NOTHING;

-- Insertar actores de ejemplo
INSERT INTO actors (name) VALUES 
  ('Leonardo DiCaprio'),
  ('Tom Hanks'),
  ('Meryl Streep'),
  ('Morgan Freeman')
ON CONFLICT DO NOTHING;
*/

-- ============================================
-- SCRIPT COMPLETADO
-- ============================================
-- Todas las tablas han sido creadas exitosamente
-- Ahora puedes usar la aplicación Angular
