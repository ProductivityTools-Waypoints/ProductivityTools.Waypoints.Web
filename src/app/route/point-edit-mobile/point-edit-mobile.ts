import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteService } from '../route.service';
import { Point } from '../models/point';
import { Route } from '../models/route';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-point-edit-mobile',
  imports: [FormsModule, CommonModule],
  templateUrl: './point-edit-mobile.html',
  styleUrl: './point-edit-mobile.css',
})
export class PointEditMobile implements OnInit {
  routeId: string | null = null;
  index: number | null = null;
  route: Route | null = null;
  point: Point = new Point('', 0, 0);
  isEdit = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private routeService: RouteService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.isEdit = this.activeRoute.snapshot.url[0]?.path === 'point-edit';

    this.activeRoute.paramMap.subscribe(params => {
      this.routeId = params.get('id');
      
      if (this.routeId) {
        this.routeService.getRoute(this.routeId).subscribe(route => {
          const copiedRoute = new Route(route.id, route.name, route.direction);
          copiedRoute.points = route.points ? route.points.map(p => new Point(p.name, p.odometer, p.distance)) : [];
          this.route = copiedRoute;
          this.setupPoint();
        });
      }
    });

    this.activeRoute.queryParamMap.subscribe(queryParams => {
      const indexStr = queryParams.get('index');
      if (indexStr !== null) {
        this.index = +indexStr;
      } else {
        this.index = null;
      }
      this.setupPoint();
    });
  }

  setupPoint() {
    if (!this.route) {
      return;
    }

    if (this.isEdit && this.index !== null && this.route.points[this.index]) {
      this.point = this.route.points[this.index];
    } else {
      this.point = new Point('', 0, 0);
      if (this.index === null) {
        this.index = this.route.points.length;
      }
    }
    this.cdr.detectChanges();
  }

  onOdometerChange(value: number) {
    if (this.route && this.index !== null && this.index > 0) {
      const prevPoint = this.route.points[this.index - 1];
      if (prevPoint) {
        const prevOdometer = prevPoint.odometer || 0;
        this.point.distance = value - prevOdometer;
      }
    }
  }

  onSave() {
    console.log('Saving point:', this.point, this.route);
    if (this.route && this.point) {
      if (!this.isEdit) {
        if (this.index !== null) {
          this.route.points.splice(this.index, 0, this.point);
          if (this.index + 1 < this.route.points.length) {
            this.route.points[this.index+1].distance = this.route.points[this.index+1].distance - this.point.distance;
          }
        } else {
          this.route.points.push(this.point);
        }
      }
      
      const startIndex = (this.index !== null && this.index > 0) ? this.index : 1;
      for (let i = startIndex; i < this.route.points.length; i++) {
        const prevPoint = this.route.points[i - 1];
        const currentPoint = this.route.points[i];
        currentPoint.odometer = (prevPoint.odometer || 0) + currentPoint.distance;
      }

      this.routeService.save(this.route).subscribe({
        next: () => {
          this.router.navigate(['/route-details', this.routeId]);
        },
        error: (err) => {
          console.error('Error saving route with point', err);
        }
      });
    }
  }
}
