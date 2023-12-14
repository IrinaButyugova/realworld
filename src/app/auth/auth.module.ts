import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { RegisterComponent } from "./components/register/register.component";

const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent
    }
]

@NgModule({
    declarations: [RegisterComponent],
    imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule]
})
export class AuthModule{

}