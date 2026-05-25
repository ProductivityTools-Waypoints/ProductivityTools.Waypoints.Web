import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RouteService } from '../route.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Route } from '../models/route';
import { signal } from '@angular/core';


@Component({
  selector: 'app-route-details',
  imports: [FormsModule, CommonModule],
  templateUrl: './route-details.html',
  styleUrl: './route-details.css',
})
export class RouteDetails implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private routeService: RouteService) { }

  routeDetails = signal<Route>(null as any);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      console.log('RouteDetails id: ', id);
      if (id) {
        this.routeService.getRoute(id).subscribe((route: Route) => {
          console.log('RouteDetails route: ', route);
          this.routeDetails.set(route);
        });
      }
    });
  }
}
