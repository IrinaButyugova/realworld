
import { Component, Input } from "@angular/core";

import { BackendErrorsInterface } from "../../../types/backendErrors.interface";

@Component({
    standalone: true,
    imports: [],
    selector: 'rw-backend-error-messages',
    templateUrl: './backendErrorMessages.component.html',
    styleUrls: ['./backendErrorMessages.component.scss']
})
export class BackendErrorMessagesComponent{
    @Input('backendErrors') backendErrorsProps!: BackendErrorsInterface;

    errorMessages!: string[]

    ngOnInit(): void{
        this.errorMessages = Object.keys(this.backendErrorsProps)
        .map(
            (name: string) => {
                const messages = this.backendErrorsProps[name].join(', ')
                return `${name} ${messages}`
            }
        )
    }
}