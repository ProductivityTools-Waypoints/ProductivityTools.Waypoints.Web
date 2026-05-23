import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Route } from '../models/route';
import { RouteService } from '../route.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-route-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './route-list.html',
  styleUrl: './route-list.css',
})
export class RouteList {

  routes$:Observable<Route[]> |undefined;
  
  constructor(private routeService: RouteService) {
    this.routes$ = this.routeService.getRoutesObservable();
  }
}
