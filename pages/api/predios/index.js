import { db } from '../../../database';

export default async (req, res) => {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        // Merge tables propietarios & predios by ID
        const query = `
        SELECT *
        FROM terrenos
        INNER JOIN propietarios
          ON terrenos.id = propietarios.id
        INNER JOIN predios
          ON propietarios.id = predios.id;`;

        // const query =
        //   'SELECT * FROM propietarios NATURAL JOIN predios, terrenos;';

        // const query =
        //   'SELECT DISTINCT id, nombre, precio, departamento, municipio, propietario_id, construccion_id, terreno_id FROM predios NATURAL JOIN propietarios, construcciones;';
        const response = await db.query(query);
        return res.json(response.rows);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    case 'POST':
      try {
        await db.query('BEGIN');

        const queryText4 =
          'INSERT INTO predios(nombre, precio, departamento, municipio) VALUES($1, $2, $3, $4) RETURNING *;';
        const response4 = await db.query(queryText4, [
          body.name,
          body.precio,
          body.departamento,
          body.municipio,
        ]);

        const queryText =
          'INSERT INTO propietarios(p_direccion, p_telefono, p_email, p_tipo, id) VALUES($1, $2, $3, $4, $5) RETURNING *;';
        const response = await db.query(queryText, [
          body.p_direccion,
          body.p_telefono,
          body.p_email,
          body.p_tipo,
          response4.rows[0].id,
        ]);

        const queryText3 =
          'INSERT INTO terrenos(t_area, t_precio, t_tipo, id) VALUES($1, $2, $3, $4) RETURNING *;';
        const response3 = await db.query(queryText3, [
          body.t_area,
          body.t_precio,
          body.t_tipo,
          response4.rows[0].id,
        ]);

        // const queryText2 =
        //   'INSERT INTO construcciones(c_pisos, c_area, c_tipo, c_direccion) VALUES($1, $2, $3, $4) RETURNING cid;';
        // const response2 = await db.query(queryText2, [
        //   body.c_pisos,
        //   body.c_area,
        //   body.c_area,
        //   body.c_direccion,
        // ]);

        await db.query('COMMIT');

        return res
          .status(200)
          .json([response4.rows[0], response.rows[0], response3.rows[0]]);
      } catch (error) {
        await db.query('ROLLBACK');
        throw error;
      }

    default:
      return;
  }
};

// const query = `WITH INSERTED AS (
//   insert INTO construcciones(c_pisos, c_area, c_tipo, c_direccion)
//   values ( '3', '200', 'Residencial', 'Medellin')
//   on CONFLICT DO NOTHING
//   RETURNING cid
// ), new_user AS(
//   INSERT INTO propietarios(p_direccion, p_telefono, p_email, p_tipo)
//   VALUES ('Medellin HARD CODED','300354','daniel@email','Natural')
//   ON CONFLICT DO NOTHING
//   RETURNING pid
// ) INSERT INTO predios(nombre, precio, departamento, municipio, propietario_id, construccion_id)
// values (
//   'Seeder', 'Seeder', 'Seeder', 'Seeder',
//   COALESCE(
//     (SELECT pid from new_user)
//   ),
//   COALESCE(
//     (SELECT cid FROM INSERTED)
//   )
// ) RETURNING *`;
