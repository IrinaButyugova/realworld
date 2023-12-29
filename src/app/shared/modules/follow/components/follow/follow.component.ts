import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { followAction } from "../../store/actions/follow.action";

@Component({
    selector: 'rw-follow',
    templateUrl: './follow.component.html'
})
export class FollowComponent implements OnInit {
    @Input('isFollowed') isFollowedProps!: boolean;
    @Input('username') usernameProps!: string;

    isFollowed!: boolean;

    constructor(private store: Store){

    }

    ngOnInit(): void {
        this.isFollowed = this.isFollowedProps;
    }

    handleFollow(): void{
        this.store.dispatch(
            followAction({
                isFollowed: this.isFollowed,
                username: this.usernameProps
            })
        );

        this.isFollowed = !this.isFollowed;
    }
}