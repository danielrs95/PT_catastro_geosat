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
        } = body;

        // console.log(query);

        const text =
          'UPDATE predios SET nombre = $1, precio = $2, departamento = $3, municipio = $4 WHERE id = $5 RETURNING *';

        const values = [nombre, precio, departamento, municipio, query.id];

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
