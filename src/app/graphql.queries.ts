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
  mutation AddRoute($route: RouteInput!) {
    AddRoute(RouteInput: $route)
  }
`;

export const GET_ROUTES = gql`
  query {
    getRoutes { 
      id,
      name
    }
  }
`;

export const GET_ROUTE = gql`
  query GetRoute($id: ID!) {
    getRoute(id: $id) {
      id
      name
    }
  }
`;