import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Propietario {
    id: ID!
    direccion: String
    telefono: String
    email: String
    tipo: String
    predios: [Predio!]!
  }

  type Construccion {
    id: ID!
    pisos: String
    area: String
    tipo: String
    direccion: String
    predios: [Predio!]!
  }

  type Terreno {
    id: ID!
    area: String
    precio: String
    tipo: String
    predios: [Predio!]!
  }

  type Predio {
    id: ID!
    nombre: String
    precio: String
    departamento: String
    municipio: String
    propietario: Propietario
    construcciones: [Construccion]
    terrenos: Terreno
  }

  type Query {
    getPredios: [Predio]
    getPredio(id: ID!): Predio!
  }

  type Mutation {
    createPredio(
      nombre: String
      precio: String
      departamento: String
      municipio: String
      p_direccion: String
      p_telefono: String
      p_email: String
      p_tipo: String
      c_pisos: String
      c_area: String
      c_tipo: String
      c_direccion: String
      t_area: String
      t_precio: String
      t_tipo: String
    ): Predio!

    deletePredio(id: ID!): Predio!
  }
`;
