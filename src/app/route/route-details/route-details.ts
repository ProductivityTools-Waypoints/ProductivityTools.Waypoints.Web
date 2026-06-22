import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { RouteService } from '../route.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Route } from '../models/route';
import { Point } from '../models/point';

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

  insertPointMobile(point :any, index: number){
    console.log("Point", point,' index', index )
    this.router.navigate(['/point-insert', this.routeDetails().id], {queryParams: {index: index} });
  }

  openDetails(point :any, index: number){
    this.router.navigate(['point-details',this.routeDetails().id],{queryParams:{index:index}})
  }

  deletePointMobile(point: any, index: number) {
    console.log("Delete Point", point, 'index:', index);
    const currentRoute = this.routeDetails();
    if (!currentRoute || !currentRoute.points) return;

    // 1. Create a shallow copy of the points array
    const updatedPoints = [...currentRoute.points];

    // 2. If it's not the last point, add the deleted point's distance to the NEXT point
    // to maintain odometer consistency for the remaining route.
    if (index < updatedPoints.length - 1) {
      const nextPointIndex = index + 1;
      // Clone the next point to modify it immutably
      updatedPoints[nextPointIndex] = {
        ...updatedPoints[nextPointIndex],
        distance: (updatedPoints[nextPointIndex].distance || 0) + (point.distance || 0)
      };
    }

    // 3. Remove the point from the copied array
    updatedPoints.splice(index, 1);

    // 4. Reconstruct the route and points using classes to strip __typename
    const cleanRoute = new Route(currentRoute.id, currentRoute.name, currentRoute.direction);
    cleanRoute.points = updatedPoints.map(p => new Point(p.name, p.odometer, p.distance));

    // 5. Save the changes to the backend and update local state on success
    this.routeService.save(cleanRoute).subscribe({
      next: (response) => {
        console.log('Point deleted and route saved successfully', response);
        this.routeDetails.set(cleanRoute);
      },
      error: (error) => {
        console.error('Error saving route after deleting point', error);
      }
    });
  }
}
