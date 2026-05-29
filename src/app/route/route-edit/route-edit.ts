import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouteInput } from '../models/route';
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
  route: RouteInput = new RouteInput(-1, '' , '');

  constructor(private routeService: RouteService) { }

  onSave(){
    console.log('Saving route: ', this.route);
    this.routeService.save(this.route).subscribe({
      next: (response) => {
        console.log('Route saved successfully', response);
      },
      error: (error) => {
        console.error('Error saving route', error);
      }
    });
  }

  addPoint(){
    this.route.points.push({ name: '', odometer: 0, distance: 0 });
  }
}
