import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Point } from '../models/point';


@Component({
  selector: 'app-point-edit-mobile',
  imports: [FormsModule],
  templateUrl: './point-edit-mobile.html',
  styleUrl: './point-edit-mobile.css',
})
export class PointEditMobile {
  @Input() point!: Point;
  @Input() points: Point[] = [];
  @Input() index!: number;

  onOdometerChange(newOdometer: number) {
    console.log('Odometer changed: ', newOdometer);
    this.point.odometer = newOdometer;

    if (this.index > 0 && this.points && this.points[this.index - 1]) {
      const prevOdometer = this.points[this.index - 1].odometer || 0;
      this.point.distance = newOdometer - prevOdometer;
    }
  }
}
