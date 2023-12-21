import { Routes } from '@angular/router';
import { RegisterComponent } from "./auth/components/register/register.component";
import { LoginComponent } from './auth/components/login/login.component';
import { GlobalFeedComponent } from './globalFeed/components/globalFeed/globalFeed.component';

export const routes: Routes = [
    {
        path: '',
        component: GlobalFeedComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
