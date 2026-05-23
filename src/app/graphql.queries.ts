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
export const ADD_ROUTE = gql`
  mutation AddRoute($name: String!) {
    AddRoute(name: $name)
  }
`;

export const GET_ROUTES = gql`
  query {
    getRoutes { 
      id
    }
  }
`;