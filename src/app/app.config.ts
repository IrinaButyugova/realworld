import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { StoreModule, provideStore, provideState } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { reducers } from './auth/store/reducers';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideClientHydration(), 
    provideStore(),
    provideState('auth', reducers),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true
    }),
    ]
};
