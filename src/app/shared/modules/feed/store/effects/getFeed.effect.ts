import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap} from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

import { FeedService } from "../../services/feed.service";
import { getFeedAction, getFeedFailureAction, getFeedSuccessAction } from "../actions/getFeed.action";
import { GetFeedResponseInterface } from "../../types/getFeedResponse.interface";

@Injectable()
export class GetFeedEffect {
    getFeed$ = createEffect(() =>
    this.actions$.pipe(
        ofType(getFeedAction),
        switchMap(({url}) => {
            return this.feedServce.getFeed(url).pipe(
                map((feed: GetFeedResponseInterface) => {
                    return getFeedSuccessAction({feed});
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(getFeedFailureAction());
                })
            )
        })
    )
    )

    constructor(private actions$: Actions, 
        private feedServce: FeedService){
        
    }
}