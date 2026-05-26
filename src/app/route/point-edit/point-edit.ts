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
}
