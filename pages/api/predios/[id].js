import { db } from '../../../database';

export default async (req, res) => {
  const { method, body, query } = req;

  switch (method) {
    case 'GET':
      try {
        const text =
          'SELECT * FROM predios NATURAL JOIN propietarios, construcciones WHERE id = $1 ';
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
        const {
          nombre,
          precio,
          departamento,
          municipio,
          c_pisos,
          c_area,
          c_tipo,
          c_direccion,
          p_direccion,
          p_telefono,
          p_email,
          p_tipo,
          terreno,
          propietario_id,
          construccion_id,
        } = body;

        console.log(query);

        const text = `WITH new_a AS (
            UPDATE predios
              SET nombre = $1, precio = $2, departamento = $3, municipio = $4
            WHERE id = $13
          ), new_b as (
              UPDATE propietarios
                SET p_direccion = $5, p_telefono = $6, p_email = $7, p_tipo = $8
              WHERE pid = $14
          )
            UPDATE construcciones
              SET c_pisos = $9, c_area = $10, c_tipo = $11, c_direccion = $12
            WHERE cid = $15;`;

        const values = [
          nombre,
          precio,
          departamento,
          municipio,
          p_direccion,
          p_telefono,
          p_email,
          p_tipo,
          c_pisos,
          c_area,
          c_tipo,
          c_direccion,
          query.id,
          propietario_id,
          construccion_id,
        ];

        const result = await db.query(text, values);
        return res.json(result.rows[0]);
      } catch (error) {
        return res.status(400).json({ message: error.message });
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
