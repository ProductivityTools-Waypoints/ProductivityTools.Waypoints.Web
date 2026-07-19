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

export const SAVE_ROUTE = gql`
  mutation SaveRoute($route: RouteInput!) {
    SaveRoute(route: $route) {
      id
      name
      direction
      points {
        name
        odometer
        distance
        comment
      }
    }
  }
`;

export const DELETE_ROUTE = gql`
  mutation DeleteRoute($id: String!) {
    DeleteRoute(id: $id)
  }
`;

export const DUPLICATE_ROUTE = gql`
  mutation DuplicateRoute($id: String!) {
    DuplicateRoute(id: $id) {
      id
      name
      direction
      points {
        name
        odometer
        distance
        comment
      }
    }
  }
`;

export const REMOVE_ODOMETERS = gql`
  mutation RemoveOdometers($id: String!) {
    RemoveOdometers(id: $id) {
      id
      name
      direction
      points {
        name
        odometer
        distance
        comment
      }
    }
  }
`;


export const GET_ROUTES = gql`
  query {
    getRoutes { 
      id,
      name
      direction
    }
  }
`;

export const GET_ROUTE = gql`
  query GetRoute($id: ID!) {
    getRoute(id: $id) {
      id
      name
      direction
      points {
        name
        odometer
        distance
        comment
      }
    }
  }
`;