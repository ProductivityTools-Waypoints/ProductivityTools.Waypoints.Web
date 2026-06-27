import { ApplicationConfig, provideBrowserGlobalErrorListeners, inject } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getAuth } from 'firebase/auth';
import { AuthService } from './auth/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      // Inject AuthService to force Firebase initialization during bootstrap
      inject(AuthService);

      // Determine URI based on environment
      let uri = 'https://pt-waypoints-api-93484780890.us-central1.run.app/graphql';

      // Check if running on localhost
      if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        uri = 'http://localhost:8080/graphql';
      }

      // Create authentication link to attach Bearer token to headers
      const authLink = setContext(async (_, { headers }) => {
        const auth = getAuth();
        const user = auth.currentUser;
        // Dynamically retrieve the latest ID token (automatically refreshes if expired)
        const token = user ? await user.getIdToken() : null;
        
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
          }
        };
      });

      const http = httpLink.create({ uri });

      return {
        link: authLink.concat(http),
        cache: new InMemoryCache(),
      };
    }),
  ],
};
