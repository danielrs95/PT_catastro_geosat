import { db } from '../../../database';

export default async (req, res) => {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const query =
          'SELECT DISTINCT id, nombre, precio, departamento, municipio FROM predios NATURAL JOIN propietarios, construcciones;';
        const response = await db.query(query);
        return res.json(response.rows);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    case 'POST':
      try {
        await db.query('BEGIN');

        const queryText =
          'INSERT INTO propietarios(p_direccion, p_telefono, p_email, p_tipo) VALUES($1, $2, $3, $4) RETURNING pid;';
        const response = await db.query(queryText, [
          'Medellin-Colombia',
          '3003544940',
          'danielrs9504@gmail.com',
          'Persona natural',
        ]);

        const queryText2 =
          'INSERT INTO construcciones(c_pisos, c_area, c_tipo, c_direccion) VALUES($1, $2, $3, $4) RETURNING cid;';
        const response2 = await db.query(queryText2, [
          '3',
          '200m2',
          'Residencial',
          'Medellin-Colombia',
        ]);

        const queryText3 =
          'INSERT INTO terrenos(t_area, t_precio, t_tipo, construccion_id) VALUES($1, $2, $3, $4) RETURNING tid;';
        const response3 = await db.query(queryText3, [
          '100m2',
          '434mil',
          'comercial',
          response2.rows[0].cid,
        ]);

        const queryText4 =
          'INSERT INTO predios(nombre, precio, departamento, municipio, propietario_id, construccion_id, terreno_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;';
        const response4 = await db.query(queryText4, [
          'Predio Hardcoded',
          'Predio Hardcoded',
          'Predio Hardcoded',
          'Predio Hardcoded',
          response.rows[0].pid,
          response2.rows[0].cid,
          response3.rows[0].tid,
        ]);

        await db.query('COMMIT');

        return res.status(200).json(response4.rows[0]);
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
