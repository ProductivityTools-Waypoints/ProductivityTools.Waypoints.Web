import { ApplicationConfig, provideBrowserGlobalErrorListeners, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideApollo(() => {
      const httpLink = inject(HttpLink);


      // Determine URI based on environment
      let uri = 'https://pt-waypoints-api-93484780890.us-central1.run.app/graphql';

      // Check if running on localhost
      if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        uri = 'http://localhost:8080/graphql';
      }



      return {
        link: httpLink.create({
          uri: uri
        }),
        cache: new InMemoryCache(),
      };
    }),
  ],
};
