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

  recalculateDistance(point:any, index:number){
    let cumulativeDistnace:number=0;
    for(let i=0;i<this.routeDetails().points.length;i++)
    {
      if (i<index)
      {
        this.routeDetails().points[i].cumulativeDistnace=0;
      }
      else
      {
        
        this.routeDetails().points[i].cumulativeDistnace=cumulativeDistnace;
        cumulativeDistnace=+this.routeDetails().points[i].distance;
      }
    }
  }
}
