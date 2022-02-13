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
    propietario: Propietario!
    construcciones: [Construccion!]!
    terrenos: Terreno!
  }

  type Query {
    getPredios: [Predio]
    getPredio(id: ID!): Predio!
  }
`;

// type Propietario {
//   id: ID!
//   direccion: String
//   telefono: String
//   email: String
//   predios: [Predio!]!
// }

// type Construccion {
//   id: ID!
//   pisos: String
//   area: String
//   tipo: String
//   direccion: String
//   predios: [Predio!]!
// }

// type Terreno {
//   id: ID!
//   area: String
//   precio: String
//   tipo: String
// }

// type Predio {
//   id: ID!
//   nombre: String
//   precio: String
//   departamento: String
//   municipio: String
//   propietarios: [Propietario!]!
//   construcciones: [Construccion!]!
//   terrenos: [Terreno!]!
// }
