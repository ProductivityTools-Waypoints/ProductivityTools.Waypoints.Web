import { Component, Input } from '@angular/core';
import { Point } from '../models/point';

@Component({
  selector: 'app-point-details',
  imports: [],
  templateUrl: './point-details.html',
  styleUrl: './point-details.css',
})
export class PointDetails {
   @Input() point!: Point;
}
