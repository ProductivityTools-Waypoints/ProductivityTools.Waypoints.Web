import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { RouteService } from '../route.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Route } from '../models/route';

@Component({
  selector: 'app-route-details',
  imports: [FormsModule, CommonModule, RouterLink],
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

  deleteRoute() {
    console.log('Delete route: ', this.routeDetails());
    this.routeService.deleteRoute(this.routeDetails().id).subscribe({
      next: (response) => {
        console.log('Route deleted successfully', response);
        this.router.navigate(['/route-list']);
      },
      error: (error) => {
        console.error('Error deleting route', error);
      }
    });
    // Implement delete logic here, e.g., call a delete method in the RouteService
    // After deletion, navigate back to the route list
    //this.router.navigate(['/route-list']);
  }

  addPointMobile() {
    console.log('Add point');
    this.router.navigate(['/add-point', this.routeDetails().id]);
  }
  removeOdometers() {
    console.log('Remove odometers');
    this.routeService.removeOdometers(this.routeDetails().id).subscribe({
      next: (response) => {
        console.log('Odometers removed successfully', response);
        this.routeDetails.set({ ...this.routeDetails(), points: response.points });
      },
      error: (error) => {
        console.error('Error removing odometers', error);
      }
    });
  }
  editPointMobile(point: any, index: number) {
    console.log('Edit point: ', point, 'index:', index);
    this.router.navigate(['/edit-point', this.routeDetails().id], { queryParams: { index: index } });
  }

  insertPointMobile(point :any, index: number){
    console.log("Point", point,' index', index )
    this.router.navigate(['/insert-point', this.routeDetails().id], {queryParams: {index: index} });
  }

  deletePointMobile(point :any, index:number){
    console.log("Point", point,' index', index )
  }
}
