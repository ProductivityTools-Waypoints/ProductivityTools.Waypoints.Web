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
    {
        path: 'route-list',
        loadComponent: () => import('./route/route-list/route-list').then(m => m.RouteList)
    },
    {
        path: 'route-details/:id',
        loadComponent: () => import('./route/route-details/route-details').then(m => m.RouteDetails)
    },
    {
        path: 'route-edit/:id',
        loadComponent: () => import('./route/route-edit/route-edit').then(m => m.RouteEdit)
    },
    {
        path: 'add-point/:id',
        loadComponent: () => import('./route/point-edit-mobile/point-edit-mobile').then(m => m.PointEditMobile)
    },
    {
        path: 'edit-point/:id',
        loadComponent: () => import('./route/point-edit-mobile/point-edit-mobile').then(m => m.PointEditMobile)
    },
    {
        path: 'point-details/:id',
        loadComponent: () => import('./route/point-details/point-details').then(m => m.PointDetails)
    },
    {
        path: 'insert-point/:id',
        loadComponent: () => import('./route/point-edit-mobile/point-edit-mobile').then(m => m.PointEditMobile)
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },


];
