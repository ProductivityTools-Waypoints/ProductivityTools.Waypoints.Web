import { Component,ChangeDetectorRef} from '@angular/core';
import { Point } from '../models/point';
import { ActivatedRoute , Router} from '@angular/router';
import { Route } from '../models/route';
import { RouteService } from '../route.service';

@Component({
  selector: 'app-point-details',
  imports: [],
  templateUrl: './point-details.html',
  styleUrl: './point-details.css',
})
export class PointDetails {
  routeId: string | null = null;
  route: Route | null = null;
  point: Point = new Point('', 0, 0);
  index: number | null = null;

  constructor(
    private router:Router,
    private activeRoute: ActivatedRoute,
    private routeService: RouteService,
    private cdr: ChangeDetectorRef

  ) {}

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((params) => {
      this.routeId = params.get('id');
      if (this.routeId) {
        this.routeService.getRoute(this.routeId).subscribe((route) => {
          console.log("Route",route);
          this.route = route;
          this.setupPoint();
        });
      }
      
    });
    this.activeRoute.queryParamMap.subscribe((queryParams) => {
      const indexStr = queryParams.get('index');
      console.log("IndexStr", indexStr)
      if (indexStr !== null) {
        this.index = +indexStr;
      } else {
        this.index = null;
      }
      this.setupPoint();
    });
  }
  setupPoint() {
    console.log("setup point", this.route?.points, this.index)
    if (this.route && this.index !== null && this.route.points[this.index])  {
      this.point = this.route.points[this.index];
      this.cdr.detectChanges();
    }
  }

  editPointMobile(){
    if (this.route)
    {
    this.router.navigate(['/point-edit', this.route.id], { queryParams: { index: this.index } });
    }
  }

  insertPointMobile(){

  }

  deletePointMobile() {
    console.log("Delete Point", this.point, 'index:', this.index);
    if (this.index === null || !this.route) return;

    this.routeService.deletePoint(this.route, this.index).subscribe({
      next: (updatedRoute) => {
        console.log('Point deleted and route saved successfully');
        this.router.navigate(['/route-details', this.routeId]);
      },
      error: (error) => {
        console.error('Error saving route after deleting point', error);
      }
    });
  }
}
