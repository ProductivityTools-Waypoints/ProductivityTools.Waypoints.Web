import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./home/hello/hello').then(m => m.Hello),
    },
    {
        path: 'route-edit',
        loadComponent: () => import('./route/route-edit/route-edit').then(m => m.RouteEdit)
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },


];
