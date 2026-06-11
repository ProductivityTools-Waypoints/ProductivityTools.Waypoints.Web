import { Injectable } from '@angular/core';
import { Route, RouteInput } from './models/route';
import { Observable } from 'rxjs';
import { Apollo, QueryRef } from 'apollo-angular';
import { SAVE_ROUTE, GET_ROUTES, GET_ROUTE, DELETE_ROUTE , REMOVE_ODOMETERS} from '../graphql.queries';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouteService {

  private routeQueryRef: QueryRef<{ getRoutes: Route[] }>;


  constructor(private apollo: Apollo) {

    this.routeQueryRef = this.apollo.watchQuery<{ getRoutes: Route[] }>({
      query: GET_ROUTES,
      fetchPolicy: 'cache-and-network'
    })
  }

  save(route: RouteInput): Observable<any> {
    console.log('RouteService saving route: ', route);
    return this.apollo.mutate({
      mutation: SAVE_ROUTE,
      variables: {
        route: route
      }
    });
  }

  getRoutesObservable(): Observable<Route[]> {

    return this.routeQueryRef.valueChanges.pipe(
      map((result: any) => {
        //debugger;
        return result.data?.getRoutes
      })
    );
  }

  getRoute(id: string): Observable<Route> {
    return this.apollo.query<{ getRoute: Route }>({
      query: GET_ROUTE,
      variables: { id }
    }).pipe(
      map((result: any) => {
        console.log('Surowy obiekt otrzymany przez Apollo:', result);
        return result.data?.getRoute;
      })
    );
  }

  deleteRoute(id: string): Observable<String> {
    return this.apollo.mutate<{ DeleteRoute: String }>({
      mutation: DELETE_ROUTE,
      variables: { id }
    }).pipe(
      map((result: any) => {
        return result.data.DeleteRoute;
      })
    );
  }

  removeOdometers(id: string): Observable<{ points: any[] }> {
    return this.apollo.mutate<{ RemoveOdometers: { points: any[] } }>({
      mutation: REMOVE_ODOMETERS,
      variables: { id }
    }).pipe(
      map((result: any) => {
        return result.data.RemoveOdometers;
      })
    );
  }
}
