import { gql } from '@apollo/client';

export const NodeDetailsFragment = gql`
fragment NodeDetailsForUniversity on NodeQuery {
    id
    name
    type
    options
    api
    validation {
      min
      max
    }
    edges {
      id
      name
      type
      options
      api
      validation {
        min
        max
      }
      edges {
        id
        name
        type
        options
        api
        validation {
          min
          max
        }
      }
      conditionalEdge {
        name
        type
      }
    }
    conditionalEdge {
      name
      type
    }
  }

`;
