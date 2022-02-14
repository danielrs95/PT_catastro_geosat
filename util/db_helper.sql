-- First we have to create main tables before making the ones that reference them

DROP TABLE construcciones, predios, propietarios, terrenos;

CREATE TABLE IF NOT EXISTS predios(
  id SERIAL PRIMARY KEY UNIQUE,
  nombre VARCHAR(100) NOT NULL,
  precio VARCHAR(100) NOT NULL,
  departamento VARCHAR(100) NOT NULL,
  municipio VARCHAR(100) NOT NULL,
  -- Use this to optional reference nullable foreign key
  created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS propietarios (
  pid SERIAL PRIMARY KEY UNIQUE,
  p_direccion VARCHAR(100) NOT NULL,
  p_telefono VARCHAR(100) NOT NULL,
  p_email VARCHAR(100) NOT NULL,
  -- Should be later 2 predefined values Natural/Juridica
  p_tipo VARCHAR(100) NOT NULL,
  id INT NOT NULL,
  FOREIGN KEY (id) REFERENCES predios (id)
);

CREATE TABLE IF NOT EXISTS terrenos (
  tid SERIAL PRIMARY KEY UNIQUE,
  t_area VARCHAR(100) NOT NULL,
  t_precio VARCHAR(100) NOT NULL,
  t_tipo VARCHAR(100) NOT NULL,
  id INT NOT NULL,
  FOREIGN KEY (id) REFERENCES predios (id)
);


CREATE TABLE IF NOT EXISTS construcciones (
  cid SERIAL PRIMARY KEY UNIQUE,
  c_pisos VARCHAR(100) NOT NULL,
  c_area VARCHAR(100) NOT NULL,
  -- Should be later 3 predefined values Industrial, Comercial o Residencial
  c_tipo VARCHAR(100) NOT NULL,
  c_direccion VARCHAR(100) NOT NULL
);


INSERT INTO propietarios(
  p_direccion, p_telefono, p_email, p_tipo
) VALUES (
  'Medellin-Colombia',
  '3003544940',
  'danielrs9504@gmail.com',
  'Persona natural'
);

INSERT INTO construcciones(
  c_pisos, c_area, c_tipo, c_direccion
) VALUES (
  '3',
  '200m2',
  'Residencial',
  'Medellin-Colombia'
);

INSERT INTO terrenos(
  t_area, t_precio, t_tipo, construccion_id
) VALUES (
  '100m2', '434mil', 'comercial', 1
);

-- Insert construcciones, propietarios & predios in 1 operation
WITH INSERTED AS (
  insert INTO construcciones(c_pisos, c_area, c_tipo, c_direccion)
  values ( '3', '200', 'Residencial', 'Medellin')
  on CONFLICT DO NOTHING
  RETURNING cid
), new_user AS (
  INSERT INTO propietarios(p_direccion, p_telefono, p_email, p_tipo)
  VALUES ('Medellin HARD CODED','300354','daniel@email','Natural')
  ON CONFLICT DO NOTHING
  RETURNING pid
) INSERT INTO predios(nombre, precio, departamento, municipio, propietario_id, construccion_id)
values (
  'Seeder', 'Seeder', 'Seeder', 'Seeder',
  COALESCE(
    (SELECT pid from new_user)
  ),
  COALESCE(
    (SELECT cid FROM INSERTED)
  )
) RETURNING *;

-- update predios & construcciones
WITH new_a AS (
  UPDATE predios
    SET nombre = '$1', precio = '$2', departamento = '$3', municipio = '$4'
  WHERE id = 1
), new_b AS (
  UPDATE propietarios
    SET p_direccion = '$5', p_telefono = '$6', p_email = '$7', p_tipo = '$8'
  WHERE cid = 1
)
UPDATE construcciones
  SET c_pisos = '$9', c_area = '$10', c_tipo = '$11', c_direccion = '$12'
WHERE cid = 1;

SELECT * FROM predios NATURAL JOIN propietarios, construcciones;


INSERT INTO propietarios(
  direccion, telefono, email,tipo
) VALUES (
  'Medellin-Colombia',
  '3003544940',
  'danielrs9504@gmail.com',
  'Persona natural'
);

-- WITH INSERTED AS (
--   insert INTO construcciones(pisos, area, tipo, direccion)
--   values ( 3, '200', 'Residencial', 'Medellin')
--   on CONFLICT DO NOTHING
--   RETURNING cid
-- )
-- WITH new_user AS (
--   INSERT INTO propietario(direccion, telefono, email,tipo)
--   VALUES ('Medellin HARD CODED','300354','daniel@email','Natural')
--   ON CONFLICT DO NOTHING
--   RETURNING pid
-- ) INSERT INTO predios(nombre, precio, departamento, municipio, propietario_id, construccion_id)
-- values (
--   'nombre', 'precio', 'dpto', 'muni',
--   COALESCE(
--     SELECT pid from new_user
--   ),
--   COALESCE(
--     (SELECT cid FROM INSERTED)
--   )
-- ) RETURNING *;


-- Basic data for populate table with relations
-- Propietarios & construcciones are the basic tables (like the main building blocks)

INSERT INTO propietarios(
  direccion, telefono, email,tipo
) VALUES (
  'Medellin-Colombia',
  '3003544940',
  'danielrs9504@gmail.com',
  'Persona natural'
);

INSERT INTO construcciones(
  pisos, area, tipo, direccion
) VALUES (
  3,
  '200m2',
  'Residencial',
  'Medellin-Colombia'
);


INSERT INTO predios(nombre, precio, departamento, municipio, propietario, construcciones, terreno) VALUES ('a','a','a','a','a','a','a');

CREATE TABLE users (
  uid SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255),
  email_verified BOOLEAN,
  date_created DATE,
  last_login DATE
);

CREATE TABLE posts (
  pid SERIAL PRIMARY KEY,
  title VARCHAR(255),
  body VARCHAR,
  user_id INT REFERENCES users(uid),
  author VARCHAR REFERENCES users(username),
  date_created TIMESTAMP
  like_user_id INT[] DEFAULT ARRAY[]::INT[],
  likes INT DEFAULT 0
);

CREATE TABLE comments (
  cid SERIAL PRIMARY KEY,
  comment VARCHAR(255),
  author VARCHAR REFERENCES users(username),
  user_id INT REFERENCES users(uid),
  post_id INT REFERENCES posts(pid),
  date_created TIMESTAMP
);
