// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '../../database';

export default async function handler(req, res) {
  const response = await db.query('SELECT NOW()');
  console.log(response);

  res.status(200).json({
    message: 'API Working',
    // messageDB: `Data base working, ${response} entries `,
    time: response.rows[0].now,
  });
}
