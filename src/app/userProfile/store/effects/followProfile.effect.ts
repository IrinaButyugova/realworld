import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap} from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

import { FollowService } from "../../../shared/services/follow.service";
import { ProfileInterface } from "../../../shared/types/profile.interface";
import { followProfileAction, followProfileFailureAction, followProfileSuccessAction } from "../actions/folowProfile.action";

@Injectable()
export class FollowProfileEffect {
    followProfile$ = createEffect(() =>
    this.actions$.pipe(
        ofType(followProfileAction),
        switchMap(({isFollowed, username}) => {
            const profile$ = isFollowed 
            ? this.followService.unfollow(username)
            : this.followService.follow(username);

            return profile$.pipe(
                map((profile: ProfileInterface) => {
                    return followProfileSuccessAction({profile});
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(followProfileFailureAction());
                })
            )
        })
    )
    )

    constructor(private actions$: Actions, 
        private followService: FollowService){
        
    }
}