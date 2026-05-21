import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Route } from '../models/route';
import { RouteService } from '../route.service';

@Component({
  selector: 'app-route-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './route-edit.html',
  styleUrl: './route-edit.css',
})
export class RouteEdit {
  route: Route = new Route(-1, '' , '');

  constructor(private routeService: RouteService) { }

  onSave(){
    console.log('Saving route: ', this.route);
    this.routeService.save(this.route);
  }
}
