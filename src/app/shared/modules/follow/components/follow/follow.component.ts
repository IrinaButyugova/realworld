import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Store } from "@ngrx/store";

@Component({
    selector: 'rw-follow',
    templateUrl: './follow.component.html'
})
export class FollowComponent {
    @Input('isFollowed') isFollowedProps!: boolean;
    @Input('username') usernameProps!: string;
    @Output('follow') followEvent = new EventEmitter();

    constructor(private store: Store){

    }

    handleFollow(): void{
        this.followEvent.emit();
    }
}