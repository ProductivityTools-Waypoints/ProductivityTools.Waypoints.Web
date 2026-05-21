import { gql } from 'apollo-angular';

export const GET_WAYPOINTS = gql`
  query GetWaypoints {
    waypoints {
      id
      name
      description
    }
  }
`;
export const HELLO = gql`
    query {
        helloQuery
    }
`;
export const ADD_PATH = gql`
  mutation AddPath($name: String!) {
    AddPath(name: $name)
  }
`;