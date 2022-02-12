import axios from 'axios';

export const resolvers = {
  Query: {
    getPredios: async () => {
      try {
        const predios = await axios.get('http://localhost:3000/api/predios/');
        return predios.data.map(({ id, nombre, precio }) => ({
          id,
          nombre,
          precio,
        }));
      } catch (error) {
        throw error;
      }
    },
    getPredio: async (_, args) => {
      try {
        const user = await axios.get(`http://localhost:3000/api/predios/4`);
        return {
          id: user.data.id,
          nombre: user.data.nombre,
          precio: user.data.precio,
        };
      } catch (error) {
        throw error;
      }
    },
  },
};
