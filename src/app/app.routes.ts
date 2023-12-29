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

export const routes: Routes = [
    {
        path: '',
        component: GlobalFeedComponent
    },
    {
        path: 'feed',
        component: YourFeedComponent
    },
    {
        path: 'tags/:slug',
        component: TagFeedComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'articles/new',
        component: CreateArticleComponent
    },
    {
        path: 'articles/:slug',
        component: ArticleComponent
    },
    {
        path: 'articles/:slug/edit',
        component: EditArticleComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'profiles/:slug',
        component: UserProfileComponent
    },
    {
        path: 'profiles/:slug/favorites',
        component: UserProfileComponent
    }
];
