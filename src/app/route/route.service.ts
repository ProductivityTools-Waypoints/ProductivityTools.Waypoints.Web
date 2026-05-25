import { Injectable } from '@angular/core';
import { Route } from './models/route';
import { Observable } from 'rxjs';
import { Apollo, QueryRef } from 'apollo-angular';
import { ADD_ROUTE, GET_ROUTES, GET_ROUTE } from '../graphql.queries';
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

  save(route: Route): Observable<any> {
    console.log('RouteService saving route: ', route);
    return this.apollo.mutate({
      mutation: ADD_ROUTE,
      variables: {
        name: route.name
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
        return result.data.getRoute;
      })
    );
  }
}
