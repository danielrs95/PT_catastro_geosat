import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Predio {
    id: ID
    nombre: String
    precio: String
  }

  type Query {
    getPredios: [Predio]
    getPredio(nombre: String!): Predio!
  }
`;
