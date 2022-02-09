import { db } from '../../../database';

export default async (req, res) => {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const query = 'SELECT * FROM predios';
        const response = await db.query(query);
        return res.json(response.rows);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    case 'POST':
      try {
        // Destructure from body
        const {
          nombre,
          precio,
          departamento,
          municipio,
          propietario,
          construcciones,
          terreno,
        } = body;

        const query =
          'INSERT INTO predios(nombre, precio, departamento, municipio, propietario, construcciones, terreno) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';

        const values = [
          nombre,
          precio,
          departamento,
          municipio,
          propietario,
          construcciones,
          terreno,
        ];

        const response = await db.query(query, values);

        return res.status(200).json(response.rows[0]);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }

    default:
      return;
  }
};
