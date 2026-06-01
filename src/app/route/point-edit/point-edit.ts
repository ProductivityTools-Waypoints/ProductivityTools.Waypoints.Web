import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Point } from '../models/point';

@Component({
  selector: 'point-edit',
  imports: [FormsModule],
  templateUrl: './point-edit.html',
  styleUrl: './point-edit.css',
})
export class PointEdit {
  @Input() point!: Point;
  @Input() points: Point[] = [];
  @Input() index!: number;

  onOdometerChange(value: number) {
    if (this.index > 0 && this.points && this.points[this.index - 1]) {
      const prevOdometer = this.points[this.index - 1].odometer || 0;
      this.point.distance = value - prevOdometer;
    }
  }
}
