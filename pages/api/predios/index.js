import { db } from '../../../database';

export default async (req, res) => {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const query =
          'SELECT * FROM predios NATURAL JOIN propietarios, construcciones;';
        const response = await db.query(query);
        return res.json(response.rows);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    case 'POST':
      try {
        // Destructure from body
        const {
          construccion_pisos,
          construccion_area,
          construccion_tipo,
          construccion_direccion,
          propietario_direccion,
          propietario_telefono,
          propietario_email,
          propietario_tipo,
          nombre,
          precio,
          departamento,
          municipio,
        } = body;

        // const query =
        //   'INSERT INTO predios(nombre, precio, departamento, municipio, propietario_id, construccion_id, terreno_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';

        const values = [
          construccion_pisos,
          construccion_area,
          construccion_tipo,
          construccion_direccion,
          propietario_direccion,
          propietario_telefono,
          propietario_email,
          propietario_tipo,
          nombre,
          precio,
          departamento,
          municipio,
          // propietario_id,
          // construccion_id,
          // terreno_id,
        ];

        const query = `WITH INSERTED AS (
          insert INTO construcciones(c_pisos, c_area, c_tipo, c_direccion)
          values ( $1, $2, $3, $4)
          on CONFLICT DO NOTHING
          RETURNING cid
        ), new_user AS(
          INSERT INTO propietarios(p_direccion, p_telefono, p_email, p_tipo)
          VALUES ($5, $6, $7, $8)
          ON CONFLICT DO NOTHING
          RETURNING pid
        ) INSERT INTO predios(nombre, precio, departamento, municipio, propietario_id, construccion_id)
        values (
          $9, $10, $11, $12,
          COALESCE(
            (SELECT pid from new_user)
          ),
          COALESCE(
            (SELECT cid FROM INSERTED)
          )
        ) RETURNING *`;

        // console.log('objeto que llega al post', values);
        // const response = await db.query(query);
        const response = await db.query(query, values);

        return res.status(200).json(response.rows[0]);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }

    default:
      return;
  }
};
