import { Injectable } from '@angular/core';
import { Route } from './models/route';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  constructor() { }

  save(route: Route) :Observable<any>{
    console.log('RouteService saving route: ', route);
    return new Observable();
  }

}
