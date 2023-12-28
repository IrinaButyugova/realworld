import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SettingsComponent } from "./components/settings/settings.component";
import { ReactiveFormsModule } from "@angular/forms";
import { BackendErrorMessagesModule } from "../shared/modules/backendErrorMessages/backendErrorMessages.module";

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, BackendErrorMessagesModule],
    declarations: [SettingsComponent]
})
export class SettingsModule{}