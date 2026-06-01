import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
  routeInput: RouteInput = new RouteInput('', '', '');

  constructor(private routeService: RouteService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      console.log('RouteDetails id: ', id);
      if (id) {
        this.routeService.getRoute(id).subscribe((route: Route) => {
          console.log('RouteDetails route: ', route);
          this.routeInput = route as RouteInput;
        });
      }
    });
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
      },
      error: (error) => {
        console.error('Error saving route', error);
      }
    });
  }

  addPoint() {
    this.routeInput.points.push({ name: '', odometer: 0, distance: 0 });
  }
}
