import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { RegisterComponent } from "./components/register/register.component";
import { AuthService } from "./store/services/auth.service";
import { BackendErrorMessagesModule } from "../shared/modules/backendErrorMessages/backendErrorMessages.module";

const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent
    }
]

@NgModule({
    declarations: [RegisterComponent],
    imports: [
        CommonModule, 
        RouterModule.forChild(routes), 
        ReactiveFormsModule,
        BackendErrorMessagesModule
    ],
    providers: [AuthService]
})
export class AuthModule{

}