import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { StoreModule, provideStore, provideState } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';

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
import { GetPopularTagsEffect } from './shared/modules/popularTags/store/effects/getPopularTags.effect';
import { popularTagReducers } from './shared/modules/popularTags/store/reducers';
import { PopularTagsService } from './shared/modules/popularTags/services/popularTags.service';
import { articleReducers } from './article/store/reducers';
import { GetArticleEffect } from './article/store/effects/getArticle.effect';
import { ArticleService as SharedArticleService} from './shared/services/article.service';
import { DeleteArticleEffect } from './article/store/effects/deleteArticle.effect';
import { ArticleService } from './article/services/article.service';
import { CreateAcrticleEffect } from './createArticle/store/effects/createArticle.effect';
import { createArticleReducers } from './createArticle/store/reducers';
import { CreateArticleService } from './createArticle/services/createArticle.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideClientHydration(), 
    provideStore({router: routerReducer}),
    provideState('auth', reducers),
    provideState('feed', feedReducers),
    provideState('popularTags', popularTagReducers),
    provideState('article', articleReducers),
    provideState('createArticle', createArticleReducers),
    provideEffects(
      RegisterEffect, 
      LoginEffect, 
      GetCurrentUserEffect, 
      GetFeedEffect,
      GetPopularTagsEffect,
      GetArticleEffect, 
      DeleteArticleEffect,
      CreateAcrticleEffect
      ),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true
    }),
    provideRouterStore(),
    provideHttpClient(withInterceptorsFromDi()),
    AuthService,
    PersistanceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    FeedService,
    PopularTagsService,
    SharedArticleService,
    ArticleService,
    CreateArticleService
    ]
};
