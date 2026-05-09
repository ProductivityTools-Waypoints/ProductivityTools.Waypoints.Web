import {gql} from 'apollo-angular';

export const GET_WAYPOINTS = gql`
  query GetWaypoints {
    waypoints {
      id
      name
      description
    }
  }
`;
export const HELLO_WORLD = gql`
    query {
        hello
    }
`;