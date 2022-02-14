import { db } from '../../../database';

export default async (req, res) => {
  const { method, body, query } = req;

  switch (method) {
    case 'GET':
      try {
        const text = `
        SELECT *
        FROM terrenos
        INNER JOIN propietarios
          ON terrenos.id = propietarios.id
        INNER JOIN predios
          ON propietarios.id = predios.id
        INNER JOIN construcciones
          ON propietarios.id = construcciones.id
        WHERE propietarios.id = $1;`;
        const values = [query.id];
        const result = await db.query(text, values);

        if (result.rowCount === 0) {
          return res.status(404).json({ message: 'Predio no encontrado' });
        }
        return res.json(result.rows[0]);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    case 'PUT':
      try {
        await db.query('BEGIN');

        const queryText = `
        UPDATE predios
        SET nombre=$1,
          precio=$2,
          departamento=$3,
          municipio=$4
        WHERE id=$5
        RETURNING *;`;
        const updatedPredio = await db.query(queryText, [
          body.nombre,
          body.precio,
          body.departamento,
          body.municipio,
          query.id,
        ]);

        const queryText2 = `
        UPDATE propietarios
        SET p_direccion=$1,
          p_telefono=$2,
          p_email=$3,
          p_tipo=$4
        WHERE id=$5
        RETURNING *;`;
        const updatedPropietario = await db.query(queryText2, [
          body.p_direccion,
          body.p_telefono,
          body.p_email,
          body.p_tipo,
          updatedPredio.rows[0].id,
        ]);

        const queryText3 = `
        UPDATE terrenos
        SET t_area=$1,
          t_precio=$2,
          t_tipo=$3
        WHERE id=$4
        RETURNING *;`;
        const updatedTerreno = await db.query(queryText3, [
          body.t_area,
          body.t_precio,
          body.t_tipo,
          updatedPredio.rows[0].id,
        ]);

        const queryText4 = `
        UPDATE construcciones
        SET c_pisos=$1,
          c_area=$2,
          c_tipo=$3,
          c_direccion=$4
        WHERE id=$5
        RETURNING *;`;
        const updatedConstruccion = await db.query(queryText4, [
          body.c_pisos,
          body.c_area,
          body.c_tipo,
          body.c_direccion,
          updatedPredio.rows[0].id,
        ]);

        await db.query('COMMIT');

        return res
          .status(200)
          .json([
            updatedPredio.rows[0],
            updatedPropietario.rows[0],
            updatedTerreno.rows[0],
            updatedConstruccion.rows[0],
          ]);

        // const {
        //   nombre,
        //   precio,
        //   departamento,
        //   municipio,
        //   c_pisos,
        //   c_area,
        //   c_tipo,
        //   c_direccion,
        //   p_direccion,
        //   p_telefono,
        //   p_email,
        //   p_tipo,
        //   terreno,
        //   propietario_id,
        //   construccion_id,
        // } = body;

        // console.log(query);

        // const text = `WITH new_a AS (
        //     UPDATE predios
        //       SET nombre = $1, precio = $2, departamento = $3, municipio = $4
        //     WHERE id = $13
        //   ), new_b as (
        //       UPDATE propietarios
        //         SET p_direccion = $5, p_telefono = $6, p_email = $7, p_tipo = $8
        //       WHERE pid = $14
        //   )
        //     UPDATE construcciones
        //       SET c_pisos = $9, c_area = $10, c_tipo = $11, c_direccion = $12
        //     WHERE cid = $15;`;

        // const values = [
        //   nombre,
        //   precio,
        //   departamento,
        //   municipio,
        //   p_direccion,
        //   p_telefono,
        //   p_email,
        //   p_tipo,
        //   c_pisos,
        //   c_area,
        //   c_tipo,
        //   c_direccion,
        //   query.id,
        //   propietario_id,
        //   construccion_id,
        // ];

        // const result = await db.query(text, values);
        // return res.json(result.rows[0]);
      } catch (error) {
        // return res.status(400).json({ message: error.message });
        await db.query('ROLLBACK');
        throw error;
      }
    case 'DELETE':
      try {
        const text = 'DELETE FROM predios WHERE id = $1 RETURNING *';
        const values = [query.id];
        const result = await db.query(text, values);

        if (result.rowCount === 0) {
          return res.status(404).json({ message: 'Predio no encontrado' });
        }
        return res.json(result.rows[0]);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    default:
      return res.status(400).json({ message: 'Method are not supported' });
  }
};
