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
        console.log('Console log desde getPredio()', args);
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

  // Mutations
  Mutation: {
    createPredio: async (_, args) => {
      try {
        console.log('Console log desde createPredio', args);

        // Hardcoded object for testing
        const data_sample = {
          c_pisos: 'graphql',
          c_area: 'graphql',
          c_tipo: 'graphql',
          c_direccion: 'graphql',
          p_direccion: 'graphql',
          p_telefono: 'graphql',
          p_email: 'graphql',
          p_tipo: 'graphql',
          nombre: 'graphql',
          precio: 'graphql',
          departamento: 'graphql',
          municipio: 'graphql',
        };

        // Destructure data from response
        const { data } = await axios.post(
          `http://localhost:3000/api/predios/`,
          data_sample
        );

        console.log('DATA desde create graphql', data);
        return {
          nombre: data.nombre,
          precio: data.precio,
          precio: data.precio,
          departamento: data.departamento,
        };
      } catch (error) {
        throw error;
      }
    },
  },
};
