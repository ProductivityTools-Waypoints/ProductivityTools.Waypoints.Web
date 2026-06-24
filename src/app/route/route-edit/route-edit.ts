import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Route, RouteInput } from '../models/route';
import { RouteService } from '../route.service';
import { Point } from '../models/point';
import { PointEdit } from '../point-edit/point-edit';

@Component({
  selector: 'app-route-edit',
  imports: [CommonModule, FormsModule, PointEdit],
  templateUrl: './route-edit.html',
  styleUrl: './route-edit.css',
})
export class RouteEdit {
  @Input() id?: string;
  routeInput: RouteInput = new RouteInput('', '', '');

  constructor(private routeService: RouteService, 
    private route: ActivatedRoute, 
    private router:Router,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log("NGINIT")
    if (this.id) {
      console.log("THIS ID")
      this.routeService.getRoute(this.id).subscribe({
        next: (route: Route) => {
          console.log('RouteDetails route: ', route)
          const copiedRoute = new RouteInput(route.id, route.name, route.direction);
          copiedRoute.points = route.points ? route.points.map(p => new Point(p.name, p.odometer, p.distance,p.comment)) : [];
          this.routeInput = copiedRoute;
          console.log('route Input route: ', route);
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Błąd pobierania trasy', err)
      });
    }
  }

  onRouteNameChange(newName: string) {
    console.log('Route name changed: ', newName);
    this.routeInput.id = newName + '-' + this.routeInput.direction;
  }

  onRouteDirectionChange(newDirection: string) {
    console.log('Route direction changed: ', newDirection);
    this.routeInput.id = this.routeInput.name + '-' + newDirection;
  }

  onSave() {
    console.log('Saving route: ', this.routeInput);
    this.routeService.save(this.routeInput).subscribe({
      next: (response) => {
        console.log('Route saved successfully', response);
        this.router.navigate(['/route-list'])
      },
      error: (error) => {
        console.error('Error saving route', error);
      }
    });
  }

  addPoint() {
    this.routeInput.points.push(new Point('', 0, 0, ''));
  }
}
