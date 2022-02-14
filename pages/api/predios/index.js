import { db } from '../../../database';

export default async (req, res) => {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const query = `
        SELECT *
        FROM terrenos
        INNER JOIN propietarios
          ON terrenos.id = propietarios.id
        INNER JOIN predios
          ON propietarios.id = predios.id
        INNER JOIN construcciones
          ON propietarios.id = construcciones.id;
        `;

        const response = await db.query(query);
        return res.json(response.rows);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    case 'POST':
      try {
        await db.query('BEGIN');

        const queryText = `
        INSERT INTO predios(nombre, precio, departamento, municipio)
        VALUES($1, $2, $3, $4)
        RETURNING *;`;
        const createPredio = await db.query(queryText, [
          body.nombre,
          body.precio,
          body.departamento,
          body.municipio,
        ]);

        const queryText2 = `
        INSERT INTO propietarios(p_direccion, p_telefono, p_email, p_tipo, id)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *;`;
        const createPropietario = await db.query(queryText2, [
          body.p_direccion,
          body.p_telefono,
          body.p_email,
          body.p_tipo,
          createPredio.rows[0].id,
        ]);

        const queryText3 = `
        INSERT INTO terrenos(t_area, t_precio, t_tipo, id)
        VALUES($1, $2, $3, $4) RETURNING *;`;
        const createTerreno = await db.query(queryText3, [
          body.t_area,
          body.t_precio,
          body.t_tipo,
          createPredio.rows[0].id,
        ]);

        const queryText4 = `
        INSERT INTO construcciones(c_pisos, c_area, c_tipo, c_direccion, id)
        VALUES($1, $2, $3, $4, $5) RETURNING *;`;
        const createConstruccion = await db.query(queryText4, [
          body.c_pisos,
          body.c_area,
          body.c_tipo,
          body.c_direccion,
          createPredio.rows[0].id,
        ]);

        await db.query('COMMIT');

        const createComplete = {
          ...createPredio.rows[0],
          ...createPropietario.rows[0],
          ...createTerreno.rows[0],
          ...createConstruccion.rows[0],
        };

        return res.status(200).json(createComplete);
      } catch (error) {
        await db.query('ROLLBACK');
        throw error;
      }

    default:
      return;
  }
};
