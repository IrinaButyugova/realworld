import { Routes } from '@angular/router';
import { RegisterComponent } from "./auth/components/register/register.component";
import { LoginComponent } from './auth/components/login/login.component';
import { GlobalFeedComponent } from './globalFeed/components/globalFeed/globalFeed.component';
import { YourFeedComponent } from './yourFeed/components/yourFeed/yourFeed.component';
import { TagFeedComponent } from './tagFeed/components/tagFeed/tagFeed.component';
import { ArticleComponent } from './article/components/article/article.component';
import { CreateArticleComponent } from './createArticle/components/createArticle/createArticle.component';
import { EditArticleComponent } from './editArticle/components/editArticle/editArticle.component';
import { SettingsComponent } from './settings/components/settings/settings.component';
import { UserProfileComponent } from './userProfile/components/userProfile/userProfile.component';
import { provideState } from '@ngrx/store';
import { articleReducers } from './article/store/reducers';
import { DeleteArticleEffect } from './article/store/effects/deleteArticle.effect';
import { provideEffects } from '@ngrx/effects';
import { FollowProfileEffect as ArticleFollowProfileEffect} from './article/store/effects/followProfile.effect';
import { FollowProfileEffect as UserProfileFollowProfileEffect} from './userProfile/store/effects/followProfile.effect';
import { GetArticleEffect } from './article/store/effects/getArticle.effect';
import { feedReducers } from './shared/modules/feed/store/reducers';
import { popularTagReducers } from './shared/modules/popularTags/store/reducers';
import { createArticleReducers } from './createArticle/store/reducers';
import { editArticleReducers } from './editArticle/store/reducers';
import { SettingsReducers } from './settings/store/reducers';
import { userProfuleReducers } from './userProfile/store/reducers';
import { commentsReducers } from './shared/modules/comments/store/reducers';
import { CreateAcrticleEffect } from './createArticle/store/effects/createArticle.effect';
import { UpdateAcrticleEffect } from './editArticle/store/effects/updateArticle.effect';
import { GetUserProfileEffect } from './userProfile/store/effects/getUserProfile.effect';
import { ArticleService } from './article/services/article.service';
import { CreateArticleService } from './createArticle/services/createArticle.service';
import { EditArticleService } from './editArticle/services/editArticle.service';
import { GetAcrticleEffect } from './editArticle/store/effects/getArticle.effect';

export const routes: Routes = [
    {
        path: '',
        component: GlobalFeedComponent,
        providers:[

        ]
    },
    {
        path: 'feed',
        component: YourFeedComponent,
        providers:[
            
        ]
    },
    {
        path: 'tags/:slug',
        component: TagFeedComponent,
        providers:[
            
        ]
    },
    {
        path: 'register',
        component: RegisterComponent,
        providers:[

        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        providers:[

        ]
    },
    {
        path: 'articles/new',
        component: CreateArticleComponent,
        providers:[
            provideState('createArticle', createArticleReducers),
            provideEffects(CreateAcrticleEffect),
            CreateArticleService
        ]
    },
    {
        path: 'articles/:slug',
        component: ArticleComponent,
        providers:[
            provideState('article', articleReducers),
            provideEffects(
                DeleteArticleEffect,
                ArticleFollowProfileEffect,
                GetArticleEffect,
                ArticleFollowProfileEffect
                ),
            ArticleService
        ]
    },
    {
        path: 'articles/:slug/edit',
        component: EditArticleComponent,
        providers:[
            provideState('editArticle', editArticleReducers),
            provideEffects(
                UpdateAcrticleEffect,
                GetAcrticleEffect
                ),
            EditArticleService
        ]
    },
    {
        path: 'settings',
        component: SettingsComponent,
        providers:[
            provideState('settings', SettingsReducers),
            provideEffects(GetUserProfileEffect)
        ]
    },
    {
        path: 'profiles/:slug',
        component: UserProfileComponent,
        providers:[
            
        ]
    },
    {
        path: 'profiles/:slug/favorites',
        component: UserProfileComponent,
        providers:[

        ]
    }
];
