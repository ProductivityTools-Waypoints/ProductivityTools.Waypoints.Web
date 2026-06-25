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

  

  constructor(private router: Router,
     private route: ActivatedRoute,
      private routeService: RouteService,
  ) { }

  routeDetails = signal<Route>(null as any);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      console.log('RouteDetails id: ', id);
      if (id) {
        this.routeService.getRoute(id).subscribe((route: Route) => {
          console.log('RouteDetails route: ', route);
          this.routeDetails.set(route);
          this.recalculateDistance(0);
        });
      }
    });
  }

  showDeleteConfirm = false;

  deleteRoute() {
    this.showDeleteConfirm = true;
  }

  cancelDelete() {
    this.showDeleteConfirm = false;
  }

  confirmDelete() {
    this.showDeleteConfirm = false;
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
  }

  addPointMobile() {
    console.log('Add point');
    this.router.navigate(['/point-add', this.routeDetails().id]);
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

  editPointMobile(point :any, index: number){
        this.router.navigate(['/point-edit', this.routeDetails().id], { queryParams: { index: index } });

  }

  deletePointMobile(point: any, index: number) {
    this.routeService.deletePoint(this.routeDetails(), index).subscribe({
      next: (updatedRoute) => {
        console.log('Point deleted and route saved successfully');
        this.routeDetails.set(updatedRoute);
      },
      error: (error) => {
        console.error('Error saving route after deleting point', error);
      }
    });
  }

  recalculateDistance(index:number){
   console.log('recalculateDistance');
    const currentRoute = this.routeDetails();
    if (!currentRoute || !currentRoute.points) return;
    // 1. Clone the points array and clone each point object to allow mutation safely
    const updatedPoints = currentRoute.points.map(p => ({ ...p }));
    // 2. Perform the calculation
    let cumulativeDistance = 0;

    for (let i = 0; i < updatedPoints.length; i++) {
      if (i <= index) {
        // All points before and including the chosen starting point have 0 cumulative distance
        updatedPoints[i].cumulativeDistnace = 0;
      } else {
        // Accumulate distance starting from the point AFTER the chosen one
        cumulativeDistance += +(updatedPoints[i].distance || 0);
        updatedPoints[i].cumulativeDistnace = cumulativeDistance;
      }
    }
    // 3. Update the signal with the new route object (triggers UI refresh safely)
    this.routeDetails.set({
      ...currentRoute,
      points: updatedPoints
    });

     
  }
}
