
import { Component, Input } from "@angular/core";

@Component({
    standalone: true,
    imports: [],
    selector: 'rw-error-message',
    templateUrl: './errorMessage.component.html',
    styleUrls: ['./errorMessage.component.scss']
})
export class ErrorMessageComponent{
    @Input('message') messageProps: string = 'Something went wrong';
}