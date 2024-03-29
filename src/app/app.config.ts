import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { StoreModule, provideStore, provideState } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { reducers } from './auth/store/reducers';
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
import { ArticleService as SharedArticleService} from './shared/services/article.service';
import { UpdateCurrentUserEffect } from './auth/store/effects/updateCurrentUser.effect';
import { LogoutEffect } from './auth/store/effects/logout.effect';
import { AddToFavoritesEffect } from './shared/modules/addToFavorites/store/effects/addToFavorite.effect';
import { AddToFavoritesService } from './shared/modules/addToFavorites/services/addToFavorites.service';
import { GetUserProfileEffect } from './userProfile/store/effects/getUserProfile.effect';
import { userProfuleReducers } from './userProfile/store/reducers';
import { UserProfileService } from './userProfile/services/userProfile.service';
import { FollowService } from './shared/services/follow.service';
import { FollowProfileEffect as UserProfileFollowProfileEffect} from './userProfile/store/effects/followProfile.effect';
import { CommentsService } from './shared/modules/comments/services/comments.service';
import { CreateCommentEffect } from './shared/modules/comments/store/effects/createComment.effect';
import { commentsReducers } from './shared/modules/comments/store/reducers';
import { GetCommentsEffect } from './shared/modules/comments/store/effects/getComments.effect';
import { DeleteCommentEffect } from './shared/modules/comments/store/effects/deleteComment.effect';
import { UtilsService } from './shared/services/utils.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideClientHydration(), 
    provideStore({router: routerReducer}),
    provideState('auth', reducers),
    provideState('comments', commentsReducers),
    provideState('popularTags', popularTagReducers),
    provideState('feed', feedReducers),
    provideState('userProfile', userProfuleReducers),
    provideEffects(
      RegisterEffect, 
      LoginEffect, 
      GetCurrentUserEffect, 
      GetFeedEffect,
      GetPopularTagsEffect,
      UpdateCurrentUserEffect,
      LogoutEffect,
      AddToFavoritesEffect, 
      GetUserProfileEffect,
      UserProfileFollowProfileEffect,
      CreateCommentEffect,
      GetCommentsEffect, 
      DeleteCommentEffect
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
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
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
    AddToFavoritesService,
    UserProfileService,
    FollowService,
    CommentsService,
    UtilsService
    ]
};
