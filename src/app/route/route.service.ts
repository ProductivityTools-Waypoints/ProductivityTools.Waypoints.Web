import { Injectable } from '@angular/core';
import { Route, RouteInput } from './models/route';
import { Point } from './models/point';
import { Observable } from 'rxjs';
import { Apollo, QueryRef } from 'apollo-angular';
import { SAVE_ROUTE, GET_ROUTES, GET_ROUTE, DELETE_ROUTE , REMOVE_ODOMETERS, DUPLICATE_ROUTE} from '../graphql.queries';
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
    
    // Strip frontend-only properties (like cumulativeDistnace) to match backend pointInput schema
    const cleanPoints = route.points ? route.points.map(p => ({
      name: p.name,
      odometer: p.odometer,
      distance: p.distance,
      comment: p.comment
    })) : [];

    const cleanRoute = {
      id: route.id,
      name: route.name,
      direction: route.direction,
      points: cleanPoints
    };

    return this.apollo.mutate({
      mutation: SAVE_ROUTE,
      variables: {
        route: cleanRoute
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

  duplicateRoute(id: string): Observable<any> {
    return this.apollo.mutate<{ DuplicateRoute: any }>({
      mutation: DUPLICATE_ROUTE,
      variables: { id }
    }).pipe(
      map((result: any) => {
        return result.data?.DuplicateRoute;
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

  deletePoint(route: Route, index: number): Observable<Route> {
    console.log("Delete Point in service, index:", index);
    
    // 1. Create a shallow copy of the points array
    const updatedPoints = [...route.points];

    // 2. If it's not the last point, add the deleted point's distance to the NEXT point
    // to maintain odometer consistency for the remaining route.
    if (index < updatedPoints.length - 1) {
      const nextPointIndex = index + 1;
      const deletedPointDistance = route.points[index].distance || 0;
      // Clone the next point to modify it immutably
      updatedPoints[nextPointIndex] = {
        ...updatedPoints[nextPointIndex],
        distance: (updatedPoints[nextPointIndex].distance || 0) + deletedPointDistance
      };
    }

    // 3. Remove the point from the copied array
    updatedPoints.splice(index, 1);

    // 4. Reconstruct the route and points using classes to strip __typename
    const cleanRoute = new RouteInput(route.id, route.name, route.direction);
    cleanRoute.points = updatedPoints.map(p => new Point(p.name, p.odometer, p.distance, p.comment));

    // 5. Save the changes to the backend and return the updated Route
    return this.save(cleanRoute).pipe(
      map(() => {
        const updatedRoute = new Route(route.id, route.name, route.direction);
        updatedRoute.points = cleanRoute.points;
        return updatedRoute;
      })
    );
  }
}
