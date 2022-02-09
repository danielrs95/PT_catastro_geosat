CREATE TABLE IF NOT EXISTS predios(
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  precio VARCHAR(100),
  departamento VARCHAR(100),
  municipio VARCHAR(100),
  propietario VARCHAR(100),
  construcciones VARCHAR(100),
  terreno VARCHAR(100),
  created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);


CREATE TABLE IF NOT EXISTS predios(id SERIAL PRIMARY KEY,nombre VARCHAR(100),precio VARCHAR(100),departamento VARCHAR(100),municipio VARCHAR(100),propietario VARCHAR(100),construcciones VARCHAR(100),terreno VARCHAR(100),created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);

INSERT INTO predios(nombre, precio, departamento, municipio, propietario, construcciones, terreno) VALUES ('a','a','a','a','a','a','a');