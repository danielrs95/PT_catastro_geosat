import axios from 'axios';

export const resolvers = {
  Query: {
    getPredios: async () => {
      try {
        const predios = await axios.get('http://localhost:3000/api/predios/');
        console.log('Console desde query', predios.data);
        return predios.data.map(
          ({
            id,
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
          }) => ({
            id,
            nombre,
            precio,
            departamento,
            municipio,
            propietario: {
              direccion: p_direccion,
              telefono: p_telefono,
              email: p_email,
              tipo: p_tipo,
            },
            construcciones: [
              {
                pisos: c_pisos,
                area: c_area,
                tipo: c_tipo,
                direccion: c_direccion,
              },
            ],
          })
        );
      } catch (error) {
        throw error;
      }
    },
    getPredio: async (_, args) => {
      try {
        const predio = await axios.get(
          `http://localhost:3000/api/predios/${args.id}`
        );
        return {
          id: predio.data.id,
          nombre: predio.data.nombre,
          precio: predio.data.precio,
        };
      } catch (error) {
        throw error;
      }
    },
  },
};
