import { Injectable } from '@angular/core';
import { Route } from './models/route';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { ADD_PATH } from '../graphql.queries';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  constructor(private apollo: Apollo) { }

  save(route: Route) :Observable<any>{
    console.log('RouteService saving route: ', route);
    return this.apollo.mutate({
      mutation: ADD_PATH,
      variables: {
        name: route.name
      }
    });
  }

}
