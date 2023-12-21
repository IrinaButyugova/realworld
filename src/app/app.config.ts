import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { StoreModule, provideStore, provideState } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { reducers } from './auth/store/reducers';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { RegisterEffect } from './auth/store/effects/register.effect';
import { AuthService } from './auth/store/services/auth.service';
import { PersistanceService } from './shared/services/persistance.service';
import { LoginEffect } from './auth/store/effects/login.effect';
import { GetCurrentUserEffect } from './auth/store/effects/getCurrentUser.effect';
import { AuthInterceptor } from './shared/services/authinterceptor.sevice';
import { GetFeedEffect } from './shared/modules/feed/store/effects/getFeed.effect';
import { feedReducers } from './shared/modules/feed/store/reducers';
import { FeedService } from './shared/modules/feed/services/feed.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideClientHydration(), 
    provideStore(),
    provideState('auth', reducers),
    provideState('feed', feedReducers),
    provideEffects(RegisterEffect, LoginEffect, GetCurrentUserEffect, GetFeedEffect),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true
    }),
    provideHttpClient(withInterceptorsFromDi()),
    AuthService,
    PersistanceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    FeedService
    ]
};
