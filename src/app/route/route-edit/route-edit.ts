import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Route } from '../models/route';

@Component({
  selector: 'app-route-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './route-edit.html',
  styleUrl: './route-edit.css',
})
export class RouteEdit {
  route: Route = new Route(-1, '');
}
