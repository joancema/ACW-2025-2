-- ============================================
-- DATOS DE PRUEBA PARA LA APLICACIÓN
-- ============================================
-- Este script inserta datos de ejemplo para probar la aplicación
-- Ejecuta este script DESPUÉS de SUPABASE_SETUP.sql

-- ============================================
-- 1. INSERTAR CATEGORÍAS
-- ============================================

INSERT INTO categories (name) VALUES 
  ('Acción'),
  ('Drama'),
  ('Comedia'),
  ('Ciencia Ficción'),
  ('Terror'),
  ('Romance'),
  ('Aventura'),
  ('Animación')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- 2. INSERTAR ACTORES
-- ============================================

INSERT INTO actors (name) VALUES 
  ('Leonardo DiCaprio'),
  ('Tom Hanks'),
  ('Meryl Streep'),
  ('Morgan Freeman'),
  ('Scarlett Johansson'),
  ('Robert Downey Jr.'),
  ('Jennifer Lawrence'),
  ('Chris Hemsworth'),
  ('Emma Stone'),
  ('Ryan Gosling'),
  ('Natalie Portman'),
  ('Christian Bale'),
  ('Anne Hathaway'),
  ('Matt Damon'),
  ('Cate Blanchett')
ON CONFLICT DO NOTHING;

-- ============================================
-- 3. INSERTAR PELÍCULAS
-- ============================================

-- Obtener IDs de categorías (necesitamos esto para las películas)
DO $$
DECLARE
  cat_accion UUID;
  cat_drama UUID;
  cat_comedia UUID;
  cat_scifi UUID;
  cat_aventura UUID;
  
  movie_inception UUID;
  movie_forrest UUID;
  movie_lalaland UUID;
  movie_interstellar UUID;
  movie_avengers UUID;
  
  actor_leo UUID;
  actor_tom UUID;
  actor_emma UUID;
  actor_ryan UUID;
  actor_anne UUID;
  actor_matt UUID;
  actor_robert UUID;
  actor_chris UUID;
  actor_scarlett UUID;
BEGIN
  -- Obtener IDs de categorías
  SELECT id INTO cat_accion FROM categories WHERE name = 'Acción' LIMIT 1;
  SELECT id INTO cat_drama FROM categories WHERE name = 'Drama' LIMIT 1;
  SELECT id INTO cat_comedia FROM categories WHERE name = 'Comedia' LIMIT 1;
  SELECT id INTO cat_scifi FROM categories WHERE name = 'Ciencia Ficción' LIMIT 1;
  SELECT id INTO cat_aventura FROM categories WHERE name = 'Aventura' LIMIT 1;

  -- Insertar películas
  INSERT INTO movies (title, image, description, category_id)
  VALUES (
    'Inception',
    'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    'Un ladrón que roba secretos corporativos a través del uso de la tecnología de compartir sueños recibe la tarea inversa de plantar una idea en la mente de un CEO.',
    cat_scifi
  )
  RETURNING id INTO movie_inception;

  INSERT INTO movies (title, image, description, category_id)
  VALUES (
    'Forrest Gump',
    'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
    'Las presidencias de Kennedy y Johnson, la guerra de Vietnam, el escándalo Watergate y otros eventos históricos se desarrollan desde la perspectiva de un hombre de Alabama con un coeficiente intelectual de 75.',
    cat_drama
  )
  RETURNING id INTO movie_forrest;

  INSERT INTO movies (title, image, description, category_id)
  VALUES (
    'La La Land',
    'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
    'Mientras navegan por sus carreras en Los Ángeles, un pianista y una actriz se enamoran mientras intentan reconciliar sus aspiraciones para el futuro.',
    cat_comedia
  )
  RETURNING id INTO movie_lalaland;

  INSERT INTO movies (title, image, description, category_id)
  VALUES (
    'Interstellar',
    'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    'Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento de garantizar la supervivencia de la humanidad.',
    cat_scifi
  )
  RETURNING id INTO movie_interstellar;

  INSERT INTO movies (title, image, description, category_id)
  VALUES (
    'Avengers: Endgame',
    'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    'Después de los eventos devastadores de Avengers: Infinity War, el universo está en ruinas. Con la ayuda de los aliados restantes, los Vengadores se reúnen una vez más para revertir las acciones de Thanos.',
    cat_accion
  )
  RETURNING id INTO movie_avengers;

  -- Obtener IDs de actores
  SELECT id INTO actor_leo FROM actors WHERE name = 'Leonardo DiCaprio' LIMIT 1;
  SELECT id INTO actor_tom FROM actors WHERE name = 'Tom Hanks' LIMIT 1;
  SELECT id INTO actor_emma FROM actors WHERE name = 'Emma Stone' LIMIT 1;
  SELECT id INTO actor_ryan FROM actors WHERE name = 'Ryan Gosling' LIMIT 1;
  SELECT id INTO actor_anne FROM actors WHERE name = 'Anne Hathaway' LIMIT 1;
  SELECT id INTO actor_matt FROM actors WHERE name = 'Matt Damon' LIMIT 1;
  SELECT id INTO actor_robert FROM actors WHERE name = 'Robert Downey Jr.' LIMIT 1;
  SELECT id INTO actor_chris FROM actors WHERE name = 'Chris Hemsworth' LIMIT 1;
  SELECT id INTO actor_scarlett FROM actors WHERE name = 'Scarlett Johansson' LIMIT 1;

  -- ============================================
  -- 4. RELACIONAR PELÍCULAS CON ACTORES
  -- ============================================

  -- Inception: Leonardo DiCaprio
  INSERT INTO movie_actors (movie_id, actor_id)
  VALUES (movie_inception, actor_leo)
  ON CONFLICT DO NOTHING;

  -- Forrest Gump: Tom Hanks
  INSERT INTO movie_actors (movie_id, actor_id)
  VALUES (movie_forrest, actor_tom)
  ON CONFLICT DO NOTHING;

  -- La La Land: Emma Stone, Ryan Gosling
  INSERT INTO movie_actors (movie_id, actor_id)
  VALUES 
    (movie_lalaland, actor_emma),
    (movie_lalaland, actor_ryan)
  ON CONFLICT DO NOTHING;

  -- Interstellar: Anne Hathaway, Matt Damon
  INSERT INTO movie_actors (movie_id, actor_id)
  VALUES 
    (movie_interstellar, actor_anne),
    (movie_interstellar, actor_matt)
  ON CONFLICT DO NOTHING;

  -- Avengers: Robert Downey Jr., Chris Hemsworth, Scarlett Johansson
  INSERT INTO movie_actors (movie_id, actor_id)
  VALUES 
    (movie_avengers, actor_robert),
    (movie_avengers, actor_chris),
    (movie_avengers, actor_scarlett)
  ON CONFLICT DO NOTHING;

END $$;

-- ============================================
-- VERIFICACIÓN
-- ============================================
-- Ejecuta estas consultas para verificar que los datos se insertaron correctamente

-- Ver todas las categorías
SELECT * FROM categories ORDER BY name;

-- Ver todos los actores
SELECT * FROM actors ORDER BY name;

-- Ver todas las películas con sus categorías
SELECT 
  m.title,
  c.name as category,
  m.description
FROM movies m
LEFT JOIN categories c ON m.category_id = c.id
ORDER BY m.title;

-- Ver películas con sus actores
SELECT 
  m.title as movie,
  a.name as actor
FROM movies m
JOIN movie_actors ma ON m.id = ma.movie_id
JOIN actors a ON ma.actor_id = a.actor_id
ORDER BY m.title, a.name;

-- Contar actores por película
SELECT 
  m.title,
  COUNT(ma.actor_id) as num_actors
FROM movies m
LEFT JOIN movie_actors ma ON m.id = ma.movie_id
GROUP BY m.id, m.title
ORDER BY m.title;

-- ============================================
-- SCRIPT COMPLETADO
-- ============================================
-- ¡Ahora tienes datos de prueba en tu aplicación!
