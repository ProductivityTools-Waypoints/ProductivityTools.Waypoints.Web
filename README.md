# ProductivityToolsWaypointsWeb

## Development server
`http://localhost:4200/`
```bash
ng serve
```

## Coding
### Initial
```
ng generate module home
ng generate sercice home\home.service
ng generate component home\hello
```
Routes:
```
export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./home/hello/hello').then(m => m.Hello),
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' }

];

```

### Graphql
```
ng add apollo-angular
```

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
