import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap} from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

import { FollowService } from "../../services/follow.service";
import { followAction, followFailureAction, followSuccessAction } from "../actions/follow.action";
import { ProfileInterface } from "../../../../types/profile.interface";

@Injectable()
export class FollowEffect {
    follow$ = createEffect(() =>
    this.actions$.pipe(
        ofType(followAction),
        switchMap(({isFollowed, username}) => {
            const profile$ = isFollowed 
            ? this.followService.unfollow(username)
            : this.followService.follow(username);

            return profile$.pipe(
                map((profile: ProfileInterface) => {
                    return followSuccessAction({profile});
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(followFailureAction());
                })
            )
        })
    )
    )

    constructor(private actions$: Actions, 
        private followService: FollowService){
        
    }
}