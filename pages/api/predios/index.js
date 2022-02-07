export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return res.status(200).json('Metodo get');
    default:
      return;
  }
}
