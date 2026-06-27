import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./home/hello/hello').then(m => m.Hello),
    },
    {
        path: 'login',
        loadComponent: () => import('./route/login/login').then(m => m.Login),
    },
    {
        path: 'route-edit',
        loadComponent: () => import('./route/route-edit/route-edit').then(m => m.RouteEdit),
        canActivate: [authGuard]
    },
    {
        path: 'route-list',
        loadComponent: () => import('./route/route-list/route-list').then(m => m.RouteList),
        canActivate: [authGuard]
    },
    {
        path: 'route-details/:id',
        loadComponent: () => import('./route/route-details/route-details').then(m => m.RouteDetails),
        canActivate: [authGuard]
    },
    {
        path: 'route-edit/:id',
        loadComponent: () => import('./route/route-edit/route-edit').then(m => m.RouteEdit),
        canActivate: [authGuard]
    },
    {
        path: 'point-add/:id',
        loadComponent: () => import('./route/point-edit-mobile/point-edit-mobile').then(m => m.PointEditMobile),
        canActivate: [authGuard]
    },
    {
        path: 'point-edit/:id',
        loadComponent: () => import('./route/point-edit-mobile/point-edit-mobile').then(m => m.PointEditMobile),
        canActivate: [authGuard]
    },
    {
        path: 'point-details/:id',
        loadComponent: () => import('./route/point-details/point-details').then(m => m.PointDetails),
        canActivate: [authGuard]
    },
    {
        path: 'point-insert/:id',
        loadComponent: () => import('./route/point-edit-mobile/point-edit-mobile').then(m => m.PointEditMobile),
        canActivate: [authGuard]
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];
