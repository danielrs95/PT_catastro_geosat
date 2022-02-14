import axios from 'axios';

export const resolvers = {
  Query: {
    getPredios: async () => {
      try {
        const predios = await axios.get('http://localhost:3000/api/predios/');
        console.log('Console desde getPredios()', predios.data);
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
            t_area,
            t_precio,
            t_tipo,
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
            terrenos: {
              area: t_area,
              precio: t_precio,
              tipo: t_tipo,
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
        // console.log(predio.data);
        return {
          ...predio.data,
          propietario: {
            direccion: predio.data.p_direccion,
            telefono: predio.data.p_telefono,
            email: predio.data.p_email,
            tipo: predio.data.p_tipo,
          },
          terrenos: {
            area: predio.data.t_area,
            precio: predio.data.t_precio,
            tipo: predio.data.t_tipo,
          },
          construcciones: [
            {
              pisos: predio.data.c_pisos,
              area: predio.data.c_area,
              tipo: predio.data.c_tipo,
              direccion: predio.data.c_direccion,
            },
          ],
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
        console.log('ARGS createPredio', args);

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
          t_area: 'graphql',
          t_precio: 'graphql',
          t_tipo: 'graphql',
          nombre: 'args.nombre',
          precio: 'graphql',
          departamento: 'graphql',
          municipio: 'graphql',
        };

        // Destructure data from response
        const { data } = await axios.post(
          `http://localhost:3000/api/predios/`,
          data_sample
        );

        console.log('DATA createPredio', data);
        return data;
      } catch (error) {
        throw error;
      }
    },
  },
};
