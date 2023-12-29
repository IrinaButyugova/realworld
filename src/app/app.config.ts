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
import { UpdateAcrticleEffect } from './editArticle/store/effects/updateArticle.effect';
import { GetAcrticleEffect as GetUpdatedArticleEffect} from './editArticle/store/effects/getArticle.effect';
import { editArticleReducers } from './editArticle/store/reducers';
import { EditArticleService } from './editArticle/services/editArticle.service';
import { UpdateCurrentUserEffect } from './auth/store/effects/updateCurrentUser.effect';
import { SettingsReducers } from './settings/store/reducers';
import { LogoutEffect } from './auth/store/effects/logout.effect';
import { AddToFavoritesEffect } from './shared/modules/addToFavorites/store/effects/addToFavorite.effect';
import { AddToFavoritesService } from './shared/modules/addToFavorites/services/addToFavorites.service';
import { GetUserProfileEffect } from './userProfile/store/effects/getUserProfile.effect';
import { userProfuleReducers } from './userProfile/store/reducers';
import { UserProfileService } from './userProfile/services/userProfile.service';
import { FollowEffect } from './shared/modules/follow/store/effects/follow.effect';
import { FollowService } from './shared/modules/follow/services/follow.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideClientHydration(), 
    provideStore({router: routerReducer}),
    provideState('auth', reducers),
    provideState('feed', feedReducers),
    provideState('popularTags', popularTagReducers),
    provideState('article', articleReducers),
    provideState('createArticle', createArticleReducers),
    provideState('editArticle', editArticleReducers),
    provideState('settings', SettingsReducers),
    provideState('userProfile', userProfuleReducers),
    provideEffects(
      RegisterEffect, 
      LoginEffect, 
      GetCurrentUserEffect, 
      GetFeedEffect,
      GetPopularTagsEffect,
      GetArticleEffect, 
      DeleteArticleEffect,
      CreateAcrticleEffect,
      UpdateAcrticleEffect,
      GetUpdatedArticleEffect, 
      UpdateCurrentUserEffect,
      LogoutEffect,
      AddToFavoritesEffect, 
      GetUserProfileEffect,
      FollowEffect
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
    CreateArticleService,
    EditArticleService,
    AddToFavoritesService,
    UserProfileService,
    FollowService
    ]
};
