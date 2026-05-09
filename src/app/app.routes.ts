import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./home/hello/hello').then(m => m.Hello),
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' }

];
