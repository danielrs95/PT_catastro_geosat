import { db } from '../../../database';

export default async (req, res) => {
  const { method, body, query } = req;

  switch (method) {
    case 'GET':
      try {
        const text = 'SELECT * FROM predios WHERE id = $1';
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
          propietario,
          construcciones,
          terreno,
        } = body;

        const text =
          'UPDATE predios SET nombre = $1, precio = $2, departamento = $3, municipio = $4, propietario = $5, construcciones = $6, terreno = $7 WHERE id = $8 RETURNING *';

        const values = [
          nombre,
          precio,
          departamento,
          municipio,
          propietario,
          construcciones,
          terreno,
          query.id,
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
